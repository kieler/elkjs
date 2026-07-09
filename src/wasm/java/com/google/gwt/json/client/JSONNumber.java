package com.google.gwt.json.client;

import org.teavm.jso.core.JSNumber;

public class JSONNumber extends JSONValue {
    private final JSNumber number;

    public JSONNumber(final double value) {
        this(JSNumber.valueOf(value));
    }

    JSONNumber(final JSNumber number) {
        super(number);
        this.number = number;
    }

    public double doubleValue() {
        return number.doubleValue();
    }
}
