package com.google.gwt.json.client;

import org.teavm.jso.core.JSString;

public class JSONString extends JSONValue {
    private final JSString string;

    public JSONString(final String string) {
        this(JSString.valueOf(string));
    }

    JSONString(final JSString string) {
        super(string);
        this.string = string;
    }

    public String stringValue() {
        return string.stringValue();
    }
}
