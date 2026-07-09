/*
 *  Copyright 2014 Alexey Andreev.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package org.teavm.classlib.java.util;

import org.teavm.classlib.impl.RandomUtils;
import org.teavm.classlib.java.io.TSerializable;
import org.teavm.classlib.java.lang.TObject;
import org.teavm.classlib.java.util.random.TRandomGenerator;

/**
 * This implementation adapts the original TeaVM source
 * with changes taken from GWT 2.11.0's Apache-2.0-licensed {@code java.util.Random}
 * emulation: {@code user/super/com/google/gwt/emul/java/util/Random.java}.
 *
 * Rationale:
 * For ELK layout comparisons we need Java-equivalent seeded random semantics.
 * If Random(seed) produces a different sequence in TeaVM than on the JVM,
 * seeded layout runs diverge and we can no longer compare layout correctness
 * by comparing results.
 */
public class TRandom extends TObject implements TRandomGenerator, TSerializable {
    private static final double MULTIPLIER_HI = 0x5DE;
    private static final double MULTIPLIER_LO = 0xECE66D;
    private static final double TWO_TO_24 = 16777216.0;
    private static final double TWO_TO_31 = 2147483648.0;
    private static final double TWO_TO_32 = 4294967296.0;
    private static final double TWO_TO_MINUS_24 = 5.9604644775390625e-8;
    private static final double TWO_TO_MINUS_26 = 1.490116119384765625e-8;
    private static final double TWO_TO_MINUS_31 = 4.656612873077392578125e-10;
    private static final double TWO_TO_MINUS_53 = 1.1102230246251565e-16;
    private static final double[] TWO_TO_X_MINUS_24 = new double[25];
    private static final double[] TWO_TO_X_MINUS_48 = new double[33];

    static {
        double twoToXMinus48 = 1.52587890625e-5;
        for (int i = 32; i >= 0; --i) {
            TWO_TO_X_MINUS_48[i] = twoToXMinus48;
            twoToXMinus48 *= 0.5;
        }

        double twoToXMinus24 = 1.0;
        for (int i = 24; i >= 0; --i) {
            TWO_TO_X_MINUS_24[i] = twoToXMinus24;
            twoToXMinus24 *= 0.5;
        }
    }

    // Split the 48-bit state into two 24-bit limbs, following GWT's emulation strategy.
    private double seedHi;
    private double seedLo;
    /** A stored gaussian value for nextGaussian() */
    private double storedGaussian;
    /** Whether storedGaussian value is valid */
    private boolean haveStoredGaussian;

    public TRandom() {
        this(initialSeed());
    }

    public TRandom(long seed) {
        // ELK depends on Random(seed) matching JVM behavior for deterministic layout comparisons.
        setSeed(seed);
    }

    public synchronized void setSeed(long seed) {
        int hi = (int) ((seed >> 24) & 0xFFFFFF);
        int lo = (int) (seed & 0xFFFFFF);
        setSeedParts(hi, lo);
    }

    private synchronized void setSeedParts(int seedHi, int seedLo) {
        this.seedHi = seedHi ^ 0x5DE;
        this.seedLo = seedLo ^ 0xECE66D;
        haveStoredGaussian = false;
    }

    protected synchronized int next(int bits) {
        return (int) nextInternal(bits);
    }

    @Override
    public int nextInt() {
        return (int) nextInternal(32);
    }

    @Override
    public int nextInt(int n) {
        if (n <= 0) {
            throw new IllegalArgumentException();
        }
        if ((n & -n) == n) {
            return (int) ((n * nextInternal(31)) * TWO_TO_MINUS_31);
        }
        double bits;
        double value;
        do {
            bits = nextInternal(31);
            value = bits % n;
        } while (bits - value + (n - 1) < 0);
        return (int) value;
    }

    @Override
    public long nextLong() {
        return ((long) nextInternal(32) << 32) + (long) nextInternal(32);
    }

    @Override
    public float nextFloat() {
        return (float) (nextInternal(24) * TWO_TO_MINUS_24);
    }

    @Override
    public double nextDouble() {
        return nextInternal(26) * TWO_TO_MINUS_26 + nextInternal(27) * TWO_TO_MINUS_53;
    }

    /**
     * Generate a random number with Gaussian distribution:
     * centered around 0 with a standard deviation of 1.0.
     */
    @Override
    public double nextGaussian() {
        /*
         * This implementation uses the polar method to generate two gaussian
         * values at a time. One is returned, and the other is stored to be returned
         * next time.
         */
        if (haveStoredGaussian) {
            haveStoredGaussian = false;
            return storedGaussian;
        }

        double[] pair = RandomUtils.pairGaussian(this::nextDouble);
        haveStoredGaussian = true;
        storedGaussian = pair[1];

        return pair[0];
    }

    private synchronized double nextInternal(int bits) {
        double hi = seedHi * MULTIPLIER_LO + seedLo * MULTIPLIER_HI;
        double lo = seedLo * MULTIPLIER_LO + 0xB;
        double carry = Math.floor(lo * TWO_TO_MINUS_24);
        hi += carry;
        lo -= carry * TWO_TO_24;
        hi %= TWO_TO_24;

        seedHi = hi;
        seedLo = lo;

        if (bits <= 24) {
            return Math.floor(seedHi * TWO_TO_X_MINUS_24[bits]);
        }

        double high = seedHi * (1 << (bits - 24));
        double low = Math.floor(seedLo * TWO_TO_X_MINUS_48[bits]);
        double value = high + low;
        if (value >= TWO_TO_31) {
            value -= TWO_TO_32;
        }
        return value;
    }

    private static long initialSeed() {
        // Preserve ambient randomness for the no-arg constructor.
        // Seeded runs still go through the GWT-style 48-bit LCG emulation so Random(seed)
        // stays Java-compatible for deterministic ELK layout comparisons.
        long a = Double.doubleToLongBits(Math.random());
        long b = Double.doubleToLongBits(Math.random());
        return a ^ Long.rotateLeft(b, 21);
    }
}
