package com.google.gwt.json.client;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;
import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSMapLike;
import org.teavm.jso.core.JSObjects;

public class JSONObject extends JSONValue {
    private final JSMapLike<JSObject> object;

    public JSONObject() {
        this(JSObjects.createWithoutProto());
    }

    public JSONObject(final JSObject object) {
        this((JSMapLike<JSObject>) object);
    }

    private JSONObject(final JSMapLike<JSObject> object) {
        super(object);
        this.object = object;
    }

    public boolean containsKey(final String key) {
        return JSObjects.hasProperty(object, key);
    }

    public JSONValue get(final String key) {
        return JSONValue.wrap(object.get(key));
    }

    public Set<String> keySet() {
        return new LinkedHashSet<>(Arrays.asList(JSObjects.keys(object)));
    }

    public JSONValue put(final String key, final JSONValue jsonValue) {
        JSONValue previous = get(key);
        if (jsonValue == null) {
            JsonUtil.deleteProperty(object, key);
        } else {
            object.set(key, jsonValue.getJavaScriptObject());
        }
        return previous;
    }
}
