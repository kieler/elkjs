import java.io.File;
import java.nio.charset.StandardCharsets;

import com.google.common.io.Files;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.eclipse.elk.alg.layered.options.LayeredMetaDataProvider;
import org.eclipse.elk.core.RecursiveGraphLayoutEngine;
import org.eclipse.elk.core.data.LayoutMetaDataService;
import org.eclipse.elk.core.util.Maybe;
import org.eclipse.elk.core.util.NullElkProgressMonitor;
import org.eclipse.elk.graph.ElkNode;
import org.eclipse.elk.graph.json.ElkGraphJson;
import org.eclipse.elk.graph.json.JsonImporter;

public final class LayoutDump {
    private static final Gson GSON = new GsonBuilder().disableHtmlEscaping().create();

    private LayoutDump() {
    }

    public static void main(final String[] args) throws Exception {
        if (args.length != 1) {
            throw new IllegalArgumentException("Usage: LayoutDump <graph.json>");
        }

        final String graph = Files.asCharSource(new File(args[0]), StandardCharsets.UTF_8).read();
        final Maybe<JsonImporter> importerMaybe = new Maybe<JsonImporter>();

        LayoutMetaDataService.getInstance().registerLayoutMetaDataProviders(new LayeredMetaDataProvider());

        final ElkNode elkGraph = ElkGraphJson.forGraph(graph)
                .rememberImporter(importerMaybe)
                .toElk();

        new RecursiveGraphLayoutEngine().layout(elkGraph, new NullElkProgressMonitor());

        final JsonImporter importer = importerMaybe.get();
        if (importer == null) {
            throw new IllegalStateException("ELK JSON importer handle is missing.");
        }

        importer.transferLayout(elkGraph);

        final Object inputModel = importer.getInputModel();
        if (!(inputModel instanceof JsonObject)) {
            throw new IllegalStateException("Expected importer input model to be a Gson JsonObject.");
        }

        System.out.println(GSON.toJson((JsonObject) inputModel));
    }
}
