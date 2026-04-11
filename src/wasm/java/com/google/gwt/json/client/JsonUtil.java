package com.google.gwt.json.client;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSMapLike;
import org.teavm.jso.json.JSON;

final class JsonUtil {
    private JsonUtil() {
    }

    static String stringify(final JSObject value) {
        return value == null ? "null" : JSON.stringify(value);
    }

    @JSBody(script = "return null;")
    static native JSObject nullValue();

    @JSBody(params = { "a", "b" }, script = "return a === b;")
    static native boolean sameRef(JSObject a, JSObject b);

    @JSBody(params = "object", script =
            "if (object === null || object === undefined) return 0;"
                    + "var t = typeof object;"
                    + "if (t !== 'object' && t !== 'function') return 0;"
                    + "var key = '__elkJsonIdentity__';"
                    + "if (!Object.prototype.hasOwnProperty.call(object, key)) {"
                    + "  Object.defineProperty(object, key, {"
                    + "    value: (globalThis.__elkJsonIdentityCounter__ = (globalThis.__elkJsonIdentityCounter__ || 0) + 1),"
                    + "    enumerable: false"
                    + "  });"
                    + "}"
                    + "return object[key];")
    static native int identityHash(JSObject object);

    @JSBody(params = { "object", "key" }, script = "delete object[key];")
    static native void deleteProperty(JSMapLike<JSObject> object, String key);
}
