package com.google.gwt.json.client;

import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.core.JSBoolean;
import org.teavm.jso.core.JSNumber;
import org.teavm.jso.core.JSObjects;
import org.teavm.jso.core.JSString;

public class JSONValue {
    protected final JSObject value;

    protected JSONValue(final JSObject value) {
        this.value = value;
    }

    public JSONArray isArray() {
        return this instanceof JSONArray ? (JSONArray) this : null;
    }

    public JSONBoolean isBoolean() {
        return this instanceof JSONBoolean ? (JSONBoolean) this : null;
    }

    public JSONNumber isNumber() {
        return this instanceof JSONNumber ? (JSONNumber) this : null;
    }

    public JSONObject isObject() {
        return this instanceof JSONObject ? (JSONObject) this : null;
    }

    public JSONString isString() {
        return this instanceof JSONString ? (JSONString) this : null;
    }

    public JSObject getJavaScriptObject() {
        return value;
    }

    @Override
    public int hashCode() {
        if (value == null) {
            return 0;
        }
        if (this instanceof JSONString) {
            return ((JSONString) this).stringValue().hashCode();
        }
        if (this instanceof JSONNumber) {
            return Double.hashCode(((JSONNumber) this).doubleValue());
        }
        if (this instanceof JSONBoolean) {
            return Boolean.hashCode(((JSONBoolean) this).booleanValue());
        }
        return JsonUtil.identityHash(value);
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof JSONValue)) {
            return false;
        }
        JSONValue other = (JSONValue) obj;
        if (value == null || other.value == null) {
            return value == other.value;
        }
        if (this instanceof JSONString && other instanceof JSONString) {
            return ((JSONString) this).stringValue().equals(((JSONString) other).stringValue());
        }
        if (this instanceof JSONNumber && other instanceof JSONNumber) {
            return Double.compare(((JSONNumber) this).doubleValue(), ((JSONNumber) other).doubleValue()) == 0;
        }
        if (this instanceof JSONBoolean && other instanceof JSONBoolean) {
            return ((JSONBoolean) this).booleanValue() == ((JSONBoolean) other).booleanValue();
        }
        return JsonUtil.sameRef(value, other.value);
    }

    @Override
    public String toString() {
        return JsonUtil.stringify(value);
    }

    static JSONValue wrap(final JSObject jsValue) {
        if (jsValue == null || JSObjects.isUndefined(jsValue)) {
            return null;
        }
        String type = JSObjects.typeOf(jsValue);
        if ("string".equals(type)) {
            return new JSONString((JSString) jsValue);
        }
        if ("number".equals(type)) {
            return new JSONNumber((JSNumber) jsValue);
        }
        if ("boolean".equals(type)) {
            return new JSONBoolean((JSBoolean) jsValue);
        }
        if ("object".equals(type)) {
            if (JSArray.isArray(jsValue)) {
                return new JSONArray((JSArray<JSObject>) jsValue);
            }
            return new JSONObject(jsValue);
        }
        return null;
    }
}
