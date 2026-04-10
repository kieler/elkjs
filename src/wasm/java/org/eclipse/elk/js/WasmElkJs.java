/*******************************************************************************
 * Copyright (c) 2026 Kiel University and others.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
package org.eclipse.elk.js;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONBoolean;
import com.google.gwt.json.client.JSONNumber;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONString;
import com.google.gwt.json.client.JSONValue;
import java.util.Collection;
import org.eclipse.elk.alg.force.options.ForceMetaDataProvider;
import org.eclipse.elk.alg.force.options.StressMetaDataProvider;
import org.eclipse.elk.alg.layered.options.LayeredMetaDataProvider;
import org.eclipse.elk.alg.mrtree.options.MrTreeMetaDataProvider;
import org.eclipse.elk.alg.radial.options.RadialMetaDataProvider;
import org.eclipse.elk.alg.rectpacking.options.RectPackingMetaDataProvider;
import org.eclipse.elk.alg.spore.options.SporeMetaDataProvider;
import org.eclipse.elk.core.LayoutConfigurator;
import org.eclipse.elk.core.RecursiveGraphLayoutEngine;
import org.eclipse.elk.core.data.ILayoutMetaData;
import org.eclipse.elk.core.data.LayoutMetaDataService;
import org.eclipse.elk.core.data.LayoutOptionData;
import org.eclipse.elk.core.options.CoreOptions;
import org.eclipse.elk.core.util.BasicProgressMonitor;
import org.eclipse.elk.core.util.IElkProgressMonitor;
import org.eclipse.elk.core.util.ElkUtil;
import org.eclipse.elk.graph.ElkEdge;
import org.eclipse.elk.graph.ElkLabel;
import org.eclipse.elk.graph.ElkNode;
import org.eclipse.elk.graph.ElkPort;
import org.eclipse.elk.graph.json.JsonImporter;
import org.eclipse.elk.graph.json.JsonMetaDataConverter;
import org.teavm.jso.JSExport;
import org.teavm.jso.JSObject;

public final class WasmElkJs {
    private static final LayoutMetaDataService SERVICE = LayoutMetaDataService.getInstance();
    private static boolean coreRegistered;

    private WasmElkJs() {
    }

    @JSExport
    public static JSObject dispatch(final JSObject requestObject) {
        JSONObject response = new JSONObject();
        try {
            JSONObject request = requireObject(new JSONObject(requestObject));
            JSONValue id = request.get("id");
            if (id != null) {
                response.put("id", id);
            }

            String cmd = requireString(request, "cmd");
            switch (cmd) {
                case "algorithms":
                    response.put("data", getLayoutData(SERVICE.getAlgorithmData()));
                    break;
                case "categories":
                    response.put("data", getLayoutData(SERVICE.getCategoryData()));
                    break;
                case "options":
                    response.put("data", getLayoutData(SERVICE.getOptionData()));
                    break;
                case "register":
                    registerLayoutAlgorithms(requireArray(request, "algorithms"));
                    break;
                case "layout":
                    response.put("data",
                            layout(requireObject(request, "graph"), optionalObject(request, "layoutOptions"),
                                    optionalObject(request, "options")));
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported command: " + cmd);
            }
        } catch (Throwable throwable) {
            response.put("error", toErrorObject(throwable));
        }
        return response.getJavaScriptObject();
    }

    private static JSONObject layout(final JSONObject graph, final JSONObject layoutOptions, final JSONObject options) {
        JsonImporter importer = new JsonImporter();
        ElkNode elkGraph = importer.transform(graph);

        if (layoutOptions != null) {
            LayoutConfigurator configurator = optsToCfg(layoutOptions);
            ElkUtil.applyVisitors(elkGraph, configurator);
        }

        boolean recordLogs = booleanOption(options, "logging");
        boolean recordExecutionTime = booleanOption(options, "measureExecutionTime");

        BasicProgressMonitor progressMonitor = new BasicProgressMonitor()
                .withLogging(recordLogs)
                .withExecutionTimeMeasurement(recordExecutionTime);
        new RecursiveGraphLayoutEngine().layout(elkGraph, progressMonitor);

        graph.put("logging", null);
        if (recordLogs || recordExecutionTime) {
            JSONObject logs = new JSONObject();
            collectLogs(progressMonitor, logs, recordLogs, recordExecutionTime);
            graph.put("logging", logs);
        }

        importer.transferLayout(elkGraph);
        return graph;
    }

    private static void registerLayoutAlgorithms(final JSONArray algorithms) {
        if (!coreRegistered) {
            SERVICE.registerLayoutMetaDataProviders(new CoreOptions());
            coreRegistered = true;
        }

        for (int i = 0; i < algorithms.size(); ++i) {
            JSONValue value = algorithms.get(i);
            if (value == null || value.isString() == null) {
                continue;
            }
            String algorithm = value.isString().stringValue();
            if ("layered".equals(algorithm)) {
                SERVICE.registerLayoutMetaDataProviders(new LayeredMetaDataProvider());
            } else if ("force".equals(algorithm)) {
                SERVICE.registerLayoutMetaDataProviders(new ForceMetaDataProvider());
            } else if ("stress".equals(algorithm)) {
                SERVICE.registerLayoutMetaDataProviders(new StressMetaDataProvider());
            } else if ("mrtree".equals(algorithm)) {
                SERVICE.registerLayoutMetaDataProviders(new MrTreeMetaDataProvider());
            } else if ("radial".equals(algorithm)) {
                SERVICE.registerLayoutMetaDataProviders(new RadialMetaDataProvider());
            } else if ("sporeOverlap".equals(algorithm) || "sporeCompaction".equals(algorithm)) {
                SERVICE.registerLayoutMetaDataProviders(new SporeMetaDataProvider());
            } else if ("rectpacking".equals(algorithm)) {
                SERVICE.registerLayoutMetaDataProviders(new RectPackingMetaDataProvider());
            }
        }
    }

    private static void collectLogs(final IElkProgressMonitor currentPM, final JSONObject logObject,
            final boolean recordLogs, final boolean recordExecutionTime) {
        logObject.put("name", new JSONString(currentPM.getTaskName()));

        if (recordLogs && !currentPM.getLogs().isEmpty()) {
            JSONArray jsonLogs = new JSONArray();
            logObject.put("logs", jsonLogs);
            int index = 0;
            for (String message : currentPM.getLogs()) {
                jsonLogs.set(index++, new JSONString(message));
            }
        }

        if (recordExecutionTime) {
            logObject.put("executionTime", new JSONNumber(currentPM.getExecutionTime()));
        }

        if (!currentPM.getSubMonitors().isEmpty()) {
            JSONArray children = new JSONArray();
            logObject.put("children", children);
            int index = 0;
            for (IElkProgressMonitor child : currentPM.getSubMonitors()) {
                JSONObject jsonChild = new JSONObject();
                children.set(index++, jsonChild);
                collectLogs(child, jsonChild, recordLogs, recordExecutionTime);
            }
        }
    }

    private static JSONArray getLayoutData(final Collection<? extends ILayoutMetaData> data) {
        JSONArray result = new JSONArray();
        int index = 0;
        for (ILayoutMetaData item : data) {
            result.set(index++, JsonMetaDataConverter.toJson(item));
        }
        return result;
    }

    private static LayoutConfigurator optsToCfg(final JSONObject opts) {
        LayoutConfigurator configurator = new LayoutConfigurator();
        configurator.addFilter(LayoutConfigurator.NO_OVERWRITE);

        for (String key : opts.keySet()) {
            LayoutOptionData option = SERVICE.getOptionDataBySuffix(key);
            if (option == null) {
                continue;
            }

            JSONValue jsonVal = opts.get(key);
            String serialized;
            if (jsonVal == null) {
                serialized = null;
            } else if (jsonVal.isString() != null) {
                serialized = jsonVal.isString().stringValue();
            } else if (jsonVal.isBoolean() != null) {
                serialized = String.valueOf(jsonVal.isBoolean().booleanValue());
            } else if (jsonVal.isNumber() != null) {
                serialized = String.valueOf(jsonVal.isNumber().doubleValue());
            } else {
                serialized = jsonVal.toString();
            }

            Object value = option.parseValue(serialized);
            if (value == null) {
                continue;
            }

            if (option.getTargets().contains(LayoutOptionData.Target.NODES)
                    || option.getTargets().contains(LayoutOptionData.Target.PARENTS)) {
                configurator.configure(ElkNode.class).setProperty(option, value);
            }
            if (option.getTargets().contains(LayoutOptionData.Target.EDGES)) {
                configurator.configure(ElkEdge.class).setProperty(option, value);
            }
            if (option.getTargets().contains(LayoutOptionData.Target.PORTS)) {
                configurator.configure(ElkPort.class).setProperty(option, value);
            }
            if (option.getTargets().contains(LayoutOptionData.Target.LABELS)) {
                configurator.configure(ElkLabel.class).setProperty(option, value);
            }
        }
        return configurator;
    }

    private static boolean booleanOption(final JSONObject options, final String key) {
        if (options == null || !options.containsKey(key)) {
            return false;
        }
        JSONValue value = options.get(key);
        return value != null && value.isBoolean() != null && value.isBoolean().booleanValue();
    }

    private static JSONObject optionalObject(final JSONObject object, final String key) {
        JSONValue value = object.get(key);
        return value == null ? null : requireObject(value);
    }

    private static JSONArray requireArray(final JSONObject object, final String key) {
        JSONValue value = object.get(key);
        if (value == null || value.isArray() == null) {
            throw new IllegalArgumentException("Expected array for key: " + key);
        }
        return value.isArray();
    }

    private static JSONObject requireObject(final JSONObject object, final String key) {
        JSONValue value = object.get(key);
        return requireObject(value);
    }

    private static JSONObject requireObject(final JSONValue value) {
        if (value == null || value.isObject() == null) {
            throw new IllegalArgumentException("Expected object value");
        }
        return value.isObject();
    }

    private static String requireString(final JSONObject object, final String key) {
        JSONValue value = object.get(key);
        if (value == null || value.isString() == null) {
            throw new IllegalArgumentException("Expected string for key: " + key);
        }
        return value.isString().stringValue();
    }

    private static JSONObject toErrorObject(final Throwable throwable) {
        JSONObject error = new JSONObject();
        error.put("message",
                new JSONString(throwable.getMessage() == null ? throwable.toString() : throwable.getMessage()));
        error.put("type", new JSONString(throwable.getClass().getName()));
        return error;
    }
}
