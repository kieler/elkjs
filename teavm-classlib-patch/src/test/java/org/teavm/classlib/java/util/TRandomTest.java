package org.teavm.classlib.java.util;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

/**
 * Adapted from GWT 2.11.0's
 * {@code user/test/com/google/gwt/emultest/java/util/RandomTest.java}.
 *
 * We omit the parts from the original GWT test that would require the GWT test harness,
 * as we are primarily interested in taking over seeded-sequence assertions.
 */
public class TRandomTest {
    @Test
    public void nextDoubleMatchesJavaSequence() {
        TRandom random = new TRandom(1);
        assertEquals(0.7308781907032909, random.nextDouble(), 0.0);
        assertEquals(0.41008081149220166, random.nextDouble(), 0.0);
        assertEquals(0.20771484130971707, random.nextDouble(), 0.0);
        assertEquals(0.3327170559595112, random.nextDouble(), 0.0);
        assertEquals(0.9677559094241207, random.nextDouble(), 0.0);
    }

    @Test
    public void nextFloatMatchesJavaSequence() {
        TRandom random = new TRandom(1);
        assertEquals(0.7308782f, random.nextFloat(), 0.0f);
        assertEquals(0.100473166f, random.nextFloat(), 0.0f);
        assertEquals(0.4100808f, random.nextFloat(), 0.0f);
        assertEquals(0.40743977f, random.nextFloat(), 0.0f);
        assertEquals(0.2077148f, random.nextFloat(), 0.0f);
    }

    @Test
    public void nextGaussianMatchesJavaSequence() {
        TRandom random = new TRandom(1);
        assertEquals(1.561581040188955, random.nextGaussian(), 0.0);
        assertEquals(-0.6081826070068602, random.nextGaussian(), 0.0);
        assertEquals(-1.0912278829447088, random.nextGaussian(), 0.0);
        assertEquals(-0.6245401364066232, random.nextGaussian(), 0.0);
        assertEquals(-1.1182832102556484, random.nextGaussian(), 0.0);
    }

    @Test
    public void nextIntMatchesJavaSequence() {
        TRandom random = new TRandom(1);
        assertEquals(-1155869325, random.nextInt());
        assertEquals(431529176, random.nextInt());
        assertEquals(1761283695, random.nextInt());
        assertEquals(1749940626, random.nextInt());
        assertEquals(892128508, random.nextInt());
    }

    @Test(expected = IllegalArgumentException.class)
    public void nextIntRejectsZeroBound() {
        new TRandom(1).nextInt(0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void nextIntRejectsNegativeBound() {
        new TRandom(1).nextInt(-1);
    }

    @Test
    public void nextInt100MatchesJavaSequence() {
        TRandom random = new TRandom(1);
        assertEquals(85, random.nextInt(100));
        assertEquals(88, random.nextInt(100));
        assertEquals(47, random.nextInt(100));
        assertEquals(13, random.nextInt(100));
        assertEquals(54, random.nextInt(100));
    }

    @Test
    public void nextInt128MatchesJavaSequence() {
        TRandom random = new TRandom(1);
        assertEquals(93, random.nextInt(128));
        assertEquals(12, random.nextInt(128));
        assertEquals(52, random.nextInt(128));
        assertEquals(52, random.nextInt(128));
        assertEquals(26, random.nextInt(128));
    }

    @Test
    public void nextLongMatchesJavaSequence() {
        TRandom random = new TRandom(1);
        assertEquals(-4964420948893066024L, random.nextLong());
        assertEquals(7564655870752979346L, random.nextLong());
        assertEquals(3831662765844904176L, random.nextLong());
        assertEquals(6137546356583794141L, random.nextLong());
        assertEquals(-594798593157429144L, random.nextLong());
    }

    @Test
    public void setSeedReplaysJavaSequence() {
        TRandom random = new TRandom();

        random.setSeed(1);
        assertEquals(0.7308781907032909, random.nextDouble(), 0.0);

        random.setSeed(1);
        assertEquals(0.7308782f, random.nextFloat(), 0.0f);

        random.setSeed(1);
        assertEquals(1.561581040188955, random.nextGaussian(), 0.0);

        random.setSeed(1);
        assertEquals(-1155869325, random.nextInt());

        random.setSeed(1);
        assertEquals(85, random.nextInt(100));

        random.setSeed(1);
        assertEquals(93, random.nextInt(128));

        random.setSeed(1);
        assertEquals(-4964420948893066024L, random.nextLong());
    }
}
