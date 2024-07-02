/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * 
 * This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License 2.0 
 * which is available at https://www.eclipse.org/legal/epl-2.0/ 
 * 
 * SPDX-License-Identifier: EPL-2.0
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

import org.eclipse.elk.alg.common.compaction.options.*;
//import org.eclipse.elk.alg.disco.options.*;
import org.eclipse.elk.alg.layered.options.*;
import org.eclipse.elk.alg.force.options.*;
import org.eclipse.elk.alg.mrtree.options.*;
import org.eclipse.elk.alg.radial.options.*;
import org.eclipse.elk.alg.spore.options.*;
import org.eclipse.elk.alg.rectpacking.options.*;

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
                        @org.eclipse.elk.js.ElkJs::layout(*)(data.graph, data.layoutOptions || {}, data.options || {})
                        worker.postMessage({ id: data.id, data: data.graph })
                        break
                }
            }

            this.saveDispatch = function(event) {
                try {
                    _this.dispatch(event)
                } catch (err) {
                    worker.postMessage({ id: event.data.id, error: err })
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
        // Note that since ELK changed the registration mechanism to service loaders (ELK #402),
        // it is necessary to manually register the core options as well. 
        SERVICE.registerLayoutMetaDataProviders(new CoreOptions());

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
   //         } else if (alg.equals("disco")) {
   //             SERVICE.registerLayoutMetaDataProviders(new PolyominoOptions(), new DisCoMetaDataProvider());
            } else if (alg.equals("sporeOverlap") || alg.equals("sporeCompaction")) {
                SERVICE.registerLayoutMetaDataProviders(new SporeMetaDataProvider());
            } else if (alg.equals("rectpacking")) {
                SERVICE.registerLayoutMetaDataProviders(new RectPackingMetaDataProvider());
            }
        }
    }

    public static void layout(final JavaScriptObject graphObj,
                              final JavaScriptObject layoutOptionsObj,
                              final JavaScriptObject optionsObj) {
        // graph must exist
        JSONObject graph = new JSONObject(graphObj).isObject();

        // don't surround this with a try catch,
        // let the js code deal with the exception
        JsonImporter importer = new JsonImporter();
        ElkNode elkGraph = importer.transform(graph);

        // apply global layout options
        if (layoutOptionsObj != null) {
            // must be object
            JSONObject options = new JSONObject(layoutOptionsObj).isObject();
            LayoutConfigurator lc = optsToCfg(options);
            ElkUtil.applyVisitors(elkGraph, lc);
        }

        // check whether logging and/or execution time measurement shall be enabled
        boolean recordLogs = false;
        boolean recordExecutionTime = false;
        if (optionsObj != null) {
            JSONObject options = new JSONObject(optionsObj).isObject();
            if (options.containsKey("logging")) {
                recordLogs = options.get("logging").isBoolean().booleanValue();
            }
            if (options.containsKey("measureExecutionTime")) {
                recordExecutionTime = options.get("measureExecutionTime").isBoolean().booleanValue();
            }
        }

        // perform the layout
        final BasicProgressMonitor pm = new BasicProgressMonitor()
                                                .withLogging(recordLogs)
                                                .withExecutionTimeMeasurement(recordExecutionTime);
        new RecursiveGraphLayoutEngine().layout(elkGraph, pm);

        // record the logs, possibly cleaning any old logging information
        if (graph.containsKey("logging")) {
            graph.put("logging", null);
        }
        if (recordLogs || recordExecutionTime) {
            JSONObject logs = new JSONObject();
            collectLogs(pm, logs, recordLogs, recordExecutionTime);
            graph.put("logging", logs);
        }

        // transfer the computed layout to the input graph
        importer.transferLayout(elkGraph);

        // layout done, callback is called in js code
    }

    public static void collectLogs(final IElkProgressMonitor currentPM,
                                   final JSONObject logObject,
                                   final boolean recordLogs,
                                   final boolean recordExecutionTime) {

        // Set the name
        final JSONString jsonTaskName = new JSONString(currentPM.getTaskName());
        logObject.put("name", jsonTaskName);

        // Collect the logs of the current progress monitor
        if (recordLogs && !currentPM.getLogs().isEmpty()) {
            final JSONArray jsonLogs = new JSONArray();
            logObject.put("logs", jsonLogs);
            int i = 0;
            for (final String s : currentPM.getLogs()) {
                final JSONString jsonString = new JSONString(s);
                jsonLogs.set(i, jsonString);
                i++;
            }
        }

        // Record the execution time of the current progress monitor
        if (recordExecutionTime) {
            final JSONNumber jsonExecTime = new JSONNumber(currentPM.getExecutionTime());
            logObject.put("executionTime", jsonExecTime);
        }

        // And process any child progress monitors
        if (!currentPM.getSubMonitors().isEmpty()) {
            final JSONArray children = new JSONArray();
            logObject.put("children", children);
            int i = 0;
            for (final IElkProgressMonitor child : currentPM.getSubMonitors()) {
                JSONObject jsonChild = new JSONObject();
                children.set(i, jsonChild);
                collectLogs(child, jsonChild, recordLogs, recordExecutionTime);
                i++;
            }
        }
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
