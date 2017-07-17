/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
package org.eclipse.elk.js;

import java.util.Collection;

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

    private static final LayoutMetaDataService SERVICE = LayoutMetaDataService.getInstance();

    /**
     * This is the entry point method.
     */
    public void onModuleLoad() {
      exportLayout();
    }

    // JSNI is not happy when some lines are wrapped
    // CHECKSTYLEOFF LineLength
    private static native void exportLayout() /*-{

        function Dispatcher(worker) {
            var _this = this;
            this.dispatch = function(event) {
                var data = event.data
                switch (data.cmd) {
                    case 'algorithms':
                        var algs = @org.eclipse.elk.js.ElkJs::getLayoutAlgorithms(*)()
                        worker.postMessage({ id: data.id, data: algs })
                        break
                    case 'categories':
                        var cats = @org.eclipse.elk.js.ElkJs::getLayoutCategories(*)()
                        worker.postMessage({ id: data.id, data: cats })
                        break
                    case 'options':
                        var opts = @org.eclipse.elk.js.ElkJs::getLayoutOptions(*)()
                        worker.postMessage({ id: data.id, data: opts })
                        break
                    case 'register':
                        @org.eclipse.elk.js.ElkJs::registerLayoutAlgorithms(*)(data.algorithms)
                        worker.postMessage({ id: data.id })
                        break
                    case 'layout':
                        @org.eclipse.elk.js.ElkJs::layout(*)(data.graph, data.options || {})
                        worker.postMessage({ id: data.id, data: data.graph })
                        break
                }
            }

            this.saveDispatch = function(event) {
                try {
                    _this.dispatch(event)
                } catch (err) {
                    delete err['__java$exception']
                    // TODO turn the error into a proper json object
                    worker.postMessage({ id: event.data.id, error: err.message })
                }
            }
        }

        // the below works for real web workers but not for 'simulated' web worker, such as for nodejs
        // if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        if (typeof document === "undefined" && typeof self !== "undefined") {
            // real web worker
            var dispatcher = new Dispatcher(self)
            self.onmessage = dispatcher.saveDispatch
        } else if (typeof module !== "undefined" && module.exports) {
            // export a fake worker (note that the post/receive functions are inverted)

            // let it look like a regular message (add the 'data' key)
            function FakeWorker(url) {
                var _this = this;
                
                // post messages
                this.dispatcher = new Dispatcher({
                    postMessage: function(msg) { _this.onmessage({ data: msg }) }
                })

                // receive messages
                this.postMessage = function(msg) {
                    setTimeout(function() {
                        _this.dispatcher.saveDispatch({ data: msg })
                    }, 0);
                }
            }

            Object.defineProperty(exports, "__esModule", {
              value: true
            })
            module.exports = {
                'default': FakeWorker,
                Worker: FakeWorker
            }
        } else {
            // shouldn't get here, panic!
        }

    }-*/;

    public static void registerLayoutAlgorithms(final JavaScriptObject arrayObj) {
        JSONArray arr = new JSONArray(arrayObj);
        for (int i = 0; i < arr.size(); ++i) {
            String alg = arr.get(i).isString().stringValue();
            if (alg.equals("layered")) {
                SERVICE.registerLayoutMetaDataProviders(new LayeredMetaDataProvider());
            } else if (alg.equals("force")) {
                SERVICE.registerLayoutMetaDataProviders(new ForceMetaDataProvider());
            } else if (alg.equals("stress")) {
                SERVICE.registerLayoutMetaDataProviders(new StressMetaDataProvider());
            } else if (alg.equals("mrtree")) {
                SERVICE.registerLayoutMetaDataProviders(new MrTreeMetaDataProvider());
            } else if (alg.equals("radial")) {
                SERVICE.registerLayoutMetaDataProviders(new RadialMetaDataProvider());
            }
        }
    }

    public static void layout(final JavaScriptObject graphObj, final JavaScriptObject optionsObj) {
        // graph must exist
        JSONObject graph = new JSONObject(graphObj).isObject();

        // don't surround this with a try catch,
        // let the js code deal with the exception
        JsonImporter importer = new JsonImporter();
        ElkNode elkGraph = importer.transform(graph);

        // apply global layout options
        if (optionsObj != null) {
            // must be object
            JSONObject options = new JSONObject(optionsObj).isObject();
            LayoutConfigurator lc = optsToCfg(options);
            ElkUtil.applyVisitors(elkGraph, lc);
        }

        new RecursiveGraphLayoutEngine().layout(elkGraph, new BasicProgressMonitor());

        importer.transferLayout(elkGraph);

        // layout done, callback is called in js code
    }

    public static JavaScriptObject getLayoutAlgorithms() {
        return getLayoutData(SERVICE.getAlgorithmData());
    }

    public static JavaScriptObject getLayoutCategories() {
        return getLayoutData(SERVICE.getCategoryData());
    }

    public static JavaScriptObject getLayoutOptions() {
        return getLayoutData(SERVICE.getOptionData());
    }

    public static JavaScriptObject getLayoutData(final Collection<? extends ILayoutMetaData> data) {
        JSONArray arr = new JSONArray();
        for (ILayoutMetaData ld : data) {
            JSONObject json = JsonMetaDataConverter.toJson(ld);
            arr.set(arr.size(), json);
        }
        return arr.getJavaScriptObject();
    }

    private static LayoutConfigurator optsToCfg(final JSONObject opts) {
        LayoutConfigurator lc = new LayoutConfigurator();
        lc.addFilter(LayoutConfigurator.NO_OVERWRITE);
        for (String key : opts.keySet()) {
            LayoutOptionData option = SERVICE.getOptionDataBySuffix(key);
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
