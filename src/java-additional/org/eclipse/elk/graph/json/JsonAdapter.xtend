/**
 * Copyright (c) 2017, 2019 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Kiel University - initial API and implementation
 */
package org.eclipse.elk.graph.json

import com.google.gwt.json.client.JSONArray
import com.google.gwt.json.client.JSONBoolean
import com.google.gwt.json.client.JSONNumber
import com.google.gwt.json.client.JSONObject
import com.google.gwt.json.client.JSONString
import com.google.gwt.json.client.JSONValue

/**
 * The library dependent part of the {@link JsonImporter}
 * using GWT's json library.
 */
class JsonAdapter {


    // - - - - - - - - - - - - - - - - - - -
    // Getting the id of an element
    // - - - - - - - - - - - - - - - - - - -

    def Object getId(JSONObject o) {
        if (!o.containsKey("id")) {
            throw formatError("Every element must have an id.")
        }
        o.get("id").asId
    }

    def Object asId(JSONValue id) {
        switch id {
            JSONString: return id.stringValue
            JSONNumber case isInt(id.doubleValue): return id.doubleValue.intValue
            default: throw formatError("Id must be a string or an integer: '" + id + "'.")
        }
    }

    def String getIdSave(JSONObject o) {
        o.optString("id")
    }

    // - - - - - - - - - - - - - - - - - - -
    // Errors
    // - - - - - - - - - - - - - - - - - - -

    def implementationError() {
        new Error("Severe implementation error in the Json to ElkGraph importer.")
    }

    def formatError(String msg) {
        new JsonImportException(msg)
    }

    // - - - - - - - - - - - - - - - - - - -
    // Type emulation
    // - - - - - - - - - - - - - - - - - - -

    def JSONObject toJsonObject(Object o) {
        return o as JSONObject
    }

    def JSONArray toJsonArray(Object o) {
        return o as JSONArray
    }

    // - - - - - - - - - - - - - - - - - - -
    // Getting values of the json elements
    // - - - - - - - - - - - - - - - - - - -


    /**
     * If {@value v} is a primitive type (string, number, boolean)
     * it is guaranteed to be converted to a String.
     */
    def String stringVal(JSONValue v) {
        switch v {
            JSONString: v.stringValue
            JSONNumber: String.valueOf(v.doubleValue)
            JSONBoolean: String.valueOf(v.booleanValue)
            default: throw implementationError
        }
    }

    def String optString(JSONObject o, String element) {
        o.get(element)?.stringVal
    }

    def String optString(JSONArray o, int i) {
        o.get(i)?.stringVal
    }

    def String optString(Object o, String element) {
        o?.toJsonObject.optString(element)
    }

    def Double optDouble(JSONObject o, String element) {
        if (o.containsKey(element)) {
            val num = o.get(element).isNumber
            if (num !== null)
                return num.doubleValue
        }
        return null
    }

    def JSONArray optJSONArray(JSONObject arr, String element) {
        arr.get(element)?.isArray
    }

    def JSONObject optJSONObject(JSONObject o, String element) {
        o.get(element)?.isObject
    }

    def JSONObject optJSONObject(JSONArray arr, int i) {
        arr.get(i)?.isObject
    }

    // - - - - - - - - - - - - - - - - - - -

    def int sizeJsonArr(JSONArray o) {
        o.size
    }

    def boolean hasJsonObj(JSONObject o, String element) {
        o.containsKey(element)
    }

    def Iterable<String> keysJsonObj(JSONObject o) {
        o.keySet
    }

    def JSONValue getJsonObj(JSONObject o, String element) {
        o.get(element)
    }

    def JSONValue getJsonArr(JSONArray arr, int i) {
        arr.get(i)
    }

    // - - - - - - - - - - - - - - - - - - -
    // Create new json elements
    // - - - - - - - - - - - - - - - - - - -

    def JSONObject newJsonObject() {
        return new JSONObject
    }

    def JSONArray newJsonArray() {
        return new JSONArray
    }

    def JSONString toJson(String s) {
        return new JSONString(s)
    }

    def JSONNumber toJson(Number n) {
        return new JSONNumber(n.doubleValue)
    }

    // - - - - - - - - - - - - - - - - - - -
    // Add members to a json object
    // - - - - - - - - - - - - - - - - - - -

    def void addJsonObj(JSONObject o, String element, Number n) {
        o.put(element, new JSONNumber(n.doubleValue))
    }

    def void addJsonObj(JSONObject o, String element, boolean b) {
        o.put(element, JSONBoolean.getInstance(b))
    }

    def void addJsonObj(JSONObject o, String element, String s) {
        o.put(element, new JSONString(s))
    }

    def void addJsonObj(JSONObject o, String element, JSONValue jv) {
        o.put(element, jv)
    }

    def void addJsonObj(JSONObject o, String element, Object obj) {
        switch obj {
            String: o.addJsonObj(element, obj)
            Boolean: o.addJsonObj(element, obj)
            Number: o.addJsonObj(element, obj)
            default: throw implementationError
        }
    }

    // - - - - - - - - - - - - - - - - - - -
    // Add to a json array
    // - - - - - - - - - - - - - - - - - - -

    def void addJsonArr(JSONArray arr, JSONValue jv) {
        val size = arr.size
        arr.set(size, jv)
    }

    def void addJsonArr(JSONArray arr, Object o) {
        switch o {
            String: arr.addJsonArr(o.toJson)
            Number: arr.addJsonArr(o.toJson)
            default: throw implementationError
        }
    }

    // - - - - - - - - - - - - - - - - - - -
    // Convenience
    // - - - - - - - - - - - - - - - - - - -

    def isInt(double d) {
       return d % 1 === 0
    }
}
