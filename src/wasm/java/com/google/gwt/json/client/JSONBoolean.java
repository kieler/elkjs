package com.google.gwt.json.client;

import org.teavm.jso.core.JSBoolean;

public class JSONBoolean extends JSONValue {
    private static final JSONBoolean FALSE = new JSONBoolean(JSBoolean.valueOf(false));
    private static final JSONBoolean TRUE = new JSONBoolean(JSBoolean.valueOf(true));

    private final JSBoolean valueRef;

    JSONBoolean(final JSBoolean value) {
        super(value);
        this.valueRef = value;
    }

    public boolean booleanValue() {
        return valueRef.booleanValue();
    }

    public static JSONBoolean getInstance(final boolean value) {
        return value ? TRUE : FALSE;
    }
}
