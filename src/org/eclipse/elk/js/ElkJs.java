/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
package org.eclipse.elk.js;

import com.google.gwt.core.client.*;
import com.google.gwt.core.client.GWT.*;
import com.google.gwt.json.client.*;

import org.eclipse.elk.core.*;
import org.eclipse.elk.core.data.*;
import org.eclipse.elk.core.options.*;
import org.eclipse.elk.core.util.*;

import org.eclipse.elk.graph.*;
import org.eclipse.elk.graph.json.*;

import org.eclipse.elk.alg.layered.options.*;
import org.eclipse.elk.alg.force.options.*;
import org.eclipse.elk.alg.mrtree.options.*;
import org.eclipse.elk.alg.radial.options.*;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class ElkJs implements EntryPoint {

    /**
     * This is the entry point method.
     */
    public void onModuleLoad() {

      LayoutMetaDataService service = LayoutMetaDataService.getInstance();
      service.registerLayoutMetaDataProviders(
        new LayeredMetaDataProvider(),
        new ForceMetaDataProvider(),
        new StressMetaDataProvider(),
        new MrTreeMetaDataProvider(),
        new RadialMetaDataProvider());

      exportLayout();
    }

    // JSNI is not happy when some lines are wrapped
    // CHECKSTYLEOFF LineLength
    private static native void exportLayout() /*-{

        function checkParamExists(o, p, type) {
            if (o[p] === undefined || typeof o[p] !== type) {
                throw new Error("'" + p + "' parameter missing or not an object.");
            }
        }
        function checkParamIsObject(o, p) {
            if (o[p] !== undefined && typeof o[p] !== 'object') {
                throw new TypeError("'" + p + "' parameter must be an object.");
            }
        }

        function layout(params) {
            checkParamExists(params, 'callback', 'function');

            setTimeout(function() {
                try {
                    checkParamExists(params, 'graph', 'object');
                    checkParamIsObject(params, 'options');

                    @org.eclipse.elk.js.ElkJs::layout(*)(params);
                    params.callback(null, params.graph);
                } catch (err) {
                    delete err['__java$exception'];
                    params.callback(err);
                }
            }, 0);
        }

        module.exports = {
            layout: layout
        };

    }-*/;

    public static void layout(final JavaScriptObject params) {
        //System.nanoTime();
        // retrieve the passed parameters
        JSONObject paramsObj = new JSONObject(params);
        JSONObject graph = paramsObj.get("graph").isObject();

        // don't surround this with a try catch,
        // let the js code deal with the exception
        JsonImporter importer = new JsonImporter();
        ElkNode elkGraph = importer.transform(graph);

        // apply global options
        if (paramsObj.containsKey("options")) {
            JSONObject opts = paramsObj.get("options").isObject();
            LayoutConfigurator lc = optsToCfg(opts);
            ElkUtil.applyVisitors(elkGraph, lc);
        }

        new RecursiveGraphLayoutEngine().layout(elkGraph, new BasicProgressMonitor());

        importer.transferLayout(elkGraph);

        // layout done, callback is called in js code
    }

    private static LayoutConfigurator optsToCfg(final JSONObject opts) {
        LayoutConfigurator lc = new LayoutConfigurator();
        for (String key : opts.keySet()) {
            LayoutOptionData option = LayoutMetaDataService.getInstance().getOptionDataBySuffix(key);
            if (option != null) {
                JSONValue jsonVal = opts.get(key);
                String serialized;
                if (jsonVal.isString() != null) {
                    serialized = jsonVal.isString().stringValue();
                } else if (jsonVal.isBoolean() != null) {
                    serialized = String.valueOf(jsonVal.isBoolean().booleanValue());
                } else if (jsonVal.isNumber() != null) {
                    serialized = String.valueOf(jsonVal.isNumber().doubleValue());
                } else {
                    // shouldn't happen and will likely result in 'parseValue' to fail silently
                    serialized = jsonVal.toString();
                }
                Object value = option.parseValue(serialized);
                if (value != null) {
                    if (option.getTargets().contains(LayoutOptionData.Target.NODES)
                            || option.getTargets().contains(LayoutOptionData.Target.PARENTS)) {
                        lc.configure(ElkNode.class).setProperty(option, value);
                    }
                    if (option.getTargets().contains(LayoutOptionData.Target.EDGES)) {
                        lc.configure(ElkEdge.class).setProperty(option, value);
                    }
                    if (option.getTargets().contains(LayoutOptionData.Target.PORTS)) {
                        lc.configure(ElkPort.class).setProperty(option, value);
                    }
                    if (option.getTargets().contains(LayoutOptionData.Target.LABELS)){
                        lc.configure(ElkLabel.class).setProperty(option, value);
                    }
                }
            }
        }
        return lc;
    }

}
