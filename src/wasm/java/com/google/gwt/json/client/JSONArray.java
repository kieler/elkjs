package com.google.gwt.json.client;

import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSArray;

public class JSONArray extends JSONValue {
    private final JSArray<JSObject> array;

    public JSONArray() {
        this(new JSArray<>());
    }

    public JSONArray(final JSObject array) {
        this((JSArray<JSObject>) array);
    }

    JSONArray(final JSArray<JSObject> array) {
        super(array);
        this.array = array;
    }

    public JSONValue get(final int index) {
        return JSONValue.wrap(array.get(index));
    }

    public JSONValue set(final int index, final JSONValue value) {
        JSONValue previous = get(index);
        array.set(index, value == null ? JsonUtil.nullValue() : value.getJavaScriptObject());
        return previous;
    }

    public int size() {
        return array.getLength();
    }
}
