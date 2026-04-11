const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const proc = require("node:child_process");
const { pathToFileURL } = require("node:url");

const DEFAULT_EPSILON = 1e-4;
const DEFAULT_SEED = 1;
const SAMPLE_LIMIT = 5;

async function main() {
  const { patterns, epsilon, seed } = parseArgs(process.argv.slice(2));
  if (patterns.length === 0) {
    throw new Error(
      "Usage: node test/smoke/compare-layouts.js <graph-glob> [more-globs...] [--epsilon <number>] [--seed <int>]"
    );
  }

  const elkjsRoot = path.resolve(__dirname, "../..");
  const gwtEntryPath = path.join(elkjsRoot, "lib/main.js");
  const wasmEntryPath = path.join(elkjsRoot, "lib/wasm-node.mjs");
  const reportDir = path.join(elkjsRoot, "build/layout-equality-smoke/reports");
  const javaHelperJarPath = path.join(
    elkjsRoot,
    "build/libs/layout-equality-smoke-all.jar"
  );

  ensureFile(gwtEntryPath, "Build the local elkjs GWT artifacts first.");
  ensureFile(wasmEntryPath, "Build the local elkjs Wasm artifacts first.");
  ensureFile(
    javaHelperJarPath,
    "Build the dedicated smoke helper jar first with ./gradlew layoutEqualitySmokeJar."
  );

  const graphPaths = expandGraphPatterns(patterns);
  if (graphPaths.length === 0) {
    throw new Error(`No graph files matched: ${patterns.join(", ")}`);
  }

  logProgress(`Matched ${graphPaths.length} graph(s).`);
  logProgress("Loading local elkjs GWT and Wasm builds.");
  const ELK = require(gwtEntryPath);
  const gwtElk = new ELK();
  const wasmModule = await import(pathToFileURL(wasmEntryPath).href);
  const wasmElk = await wasmModule.createELK();

  const summary = {
    matches: true,
    epsilon,
    seed,
    patterns,
    graphs: [],
  };

  try {
    for (let graphIndex = 0; graphIndex < graphPaths.length; graphIndex++) {
      const graphPath = graphPaths[graphIndex];
      logProgress(`[${graphIndex + 1}/${graphPaths.length}] ${graphPath}`);
      const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));
      ensureSeed(graph, seed);

      const tempGraphPath = writeTemporaryGraph(graphPath, graph);
      try {
        const [elkJson, elkjsGwtJson, elkjsWasmJson] = await Promise.all([
          runJavaLayoutDump(javaHelperJarPath, tempGraphPath),
          gwtElk.layout(clone(graph)),
          wasmElk.layout(clone(graph)),
        ]);

        const comparisons = {
          elkVsElkjsGwt: compactComparison(
            compareGraphs(elkJson, elkjsGwtJson, epsilon)
          ),
          elkVsElkjsWasm: compactComparison(
            compareGraphs(elkJson, elkjsWasmJson, epsilon)
          ),
          elkjsGwtVsElkjsWasm: compactComparison(
            compareGraphs(elkjsGwtJson, elkjsWasmJson, epsilon)
          ),
        };

        const graphSummary = {
          graph: graphPath,
          matches: Object.values(comparisons).every(
            (comparison) => comparison.matches
          ),
          comparisons,
        };

        if (!graphSummary.matches) {
          summary.matches = false;
          logProgress(`  mismatch detected for ${graphPath}`);
        } else {
          logProgress(`  matched`);
        }

        summary.graphs.push(graphSummary);
      } finally {
        try {
          fs.unlinkSync(tempGraphPath);
        } catch (error) {
          // Best-effort cleanup.
        }
      }
    }
  } finally {
    safeTerminate(gwtElk);
    safeTerminate(wasmElk);
  }

  const reportPath = writeReport(reportDir, summary);
  printTerminalSummary(summary, reportPath);
  if (!summary.matches) {
    process.exitCode = 1;
  }
}

function logProgress(message) {
  console.error(`[layout-equality] ${message}`);
}

function parseArgs(argv) {
  const patterns = [];
  let epsilon = DEFAULT_EPSILON;
  let seed = DEFAULT_SEED;

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "--epsilon") {
      index++;
      if (index >= argv.length) {
        throw new Error("Missing value for --epsilon");
      }
      epsilon = Number.parseFloat(argv[index]);
      continue;
    }
    if (arg === "--seed") {
      index++;
      if (index >= argv.length) {
        throw new Error("Missing value for --seed");
      }
      seed = Number.parseInt(argv[index], 10);
      continue;
    }
    patterns.push(arg);
  }

  if (!Number.isFinite(epsilon) || epsilon < 0) {
    throw new Error(`Invalid epsilon: ${epsilon}`);
  }
  if (!Number.isInteger(seed)) {
    throw new Error(`Invalid seed: ${seed}`);
  }

  return { patterns, epsilon, seed };
}

function expandGraphPatterns(patterns) {
  const resolved = new Set();
  for (const pattern of patterns) {
    const matches = fs.globSync(pattern, {
      cwd: process.cwd(),
      nodir: true,
    });
    for (const match of matches) {
      resolved.add(path.resolve(process.cwd(), match));
    }
  }

  return Array.from(resolved).sort();
}

function runJavaLayoutDump(helperJarPath, graphPath) {
  const result = proc.spawnSync("java", ["-jar", helperJarPath, graphPath], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(
      result.stderr ||
        result.stdout ||
        `java exited with status ${result.status}`
    );
  }

  return JSON.parse(result.stdout);
}

function compareGraphs(expectedRoot, actualRoot, epsilon) {
  const nodeSummary = compareEntityMaps(
    flattenNodes(expectedRoot),
    flattenNodes(actualRoot),
    epsilon
  );
  const portSummary = compareEntityMaps(
    flattenPorts(expectedRoot),
    flattenPorts(actualRoot),
    epsilon
  );
  const edgeStartSummary = compareEntityMaps(
    flattenEdgeSectionPoints(expectedRoot, "startPoint"),
    flattenEdgeSectionPoints(actualRoot, "startPoint"),
    epsilon
  );
  const edgeEndSummary = compareEntityMaps(
    flattenEdgeSectionPoints(expectedRoot, "endPoint"),
    flattenEdgeSectionPoints(actualRoot, "endPoint"),
    epsilon
  );
  const bendPointSummary = compareEntityMaps(
    flattenBendPoints(expectedRoot),
    flattenBendPoints(actualRoot),
    epsilon
  );

  return {
    matches:
      nodeSummary.count === 0 &&
      portSummary.count === 0 &&
      edgeStartSummary.count === 0 &&
      edgeEndSummary.count === 0 &&
      bendPointSummary.count === 0,
    mismatches: {
      nodes: nodeSummary,
      ports: portSummary,
      edgeSectionStarts: edgeStartSummary,
      edgeSectionEnds: edgeEndSummary,
      edgeBendPoints: bendPointSummary,
    },
  };
}

function compactComparison(comparison) {
  if (comparison.matches) {
    return { matches: true };
  }

  const mismatches = {};
  for (const [name, summary] of Object.entries(comparison.mismatches)) {
    if (summary.count > 0) {
      mismatches[name] = summary;
    }
  }

  return {
    matches: false,
    mismatches,
  };
}

function compareEntityMaps(expected, actual, epsilon) {
  const keys = Array.from(
    new Set([...expected.keys(), ...actual.keys()])
  ).sort();
  const samples = [];
  let count = 0;
  let maxDx = 0;
  let maxDy = 0;

  for (const key of keys) {
    const left = expected.get(key);
    const right = actual.get(key);
    if (!left || !right) {
      count++;
      if (samples.length < SAMPLE_LIMIT) {
        samples.push({
          id: key,
          issue: left ? "missing-in-actual" : "missing-in-expected",
        });
      }
      continue;
    }

    const dx = Math.abs(left.x - right.x);
    const dy = Math.abs(left.y - right.y);
    maxDx = Math.max(maxDx, dx);
    maxDy = Math.max(maxDy, dy);

    if (dx <= epsilon && dy <= epsilon) {
      continue;
    }

    count++;
    if (samples.length < SAMPLE_LIMIT) {
      samples.push({
        id: key,
        expected: left,
        actual: right,
        dx,
        dy,
      });
    }
  }

  return {
    count,
    maxDrift: { dx: maxDx, dy: maxDy },
    samples,
  };
}

function flattenNodes(root) {
  const out = new Map();
  walkNodes(root, "root", out, 0);
  return out;
}

function walkNodes(node, parentPath, out, nodeIndex) {
  const nodePath = `${parentPath}/node:${entityId(node, nodeIndex, "node")}`;
  out.set(nodePath, pointFromShape(node));

  const children = node.children || [];
  for (let index = 0; index < children.length; index++) {
    walkNodes(children[index], nodePath, out, index);
  }
}

function flattenPorts(root) {
  const out = new Map();
  walkPorts(root, "root", out, 0);
  return out;
}

function walkPorts(node, parentPath, out, nodeIndex) {
  const nodePath = `${parentPath}/node:${entityId(node, nodeIndex, "node")}`;
  const ports = node.ports || [];
  for (let index = 0; index < ports.length; index++) {
    const port = ports[index];
    out.set(
      `${nodePath}/port:${entityId(port, index, "port")}`,
      pointFromShape(port)
    );
  }

  const children = node.children || [];
  for (let index = 0; index < children.length; index++) {
    walkPorts(children[index], nodePath, out, index);
  }
}

function flattenEdgeSectionPoints(root, pointKind) {
  const out = new Map();
  walkEdgeSectionPoints(root, "root", out, pointKind, 0);
  return out;
}

function walkEdgeSectionPoints(node, parentPath, out, pointKind, nodeIndex) {
  const nodePath = `${parentPath}/node:${entityId(node, nodeIndex, "node")}`;
  const edges = node.edges || [];
  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    const edge = edges[edgeIndex];
    const edgePath = `${nodePath}/edge:${entityId(edge, edgeIndex, "edge")}`;
    const sections = edge.sections || [];
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex];
      const point = sectionPoint(section, pointKind);
      out.set(`${edgePath}/section:${sectionIndex}/${pointKind}`, point);
    }
  }

  const children = node.children || [];
  for (let index = 0; index < children.length; index++) {
    walkEdgeSectionPoints(children[index], nodePath, out, pointKind, index);
  }
}

function flattenBendPoints(root) {
  const out = new Map();
  walkBendPoints(root, "root", out, 0);
  return out;
}

function walkBendPoints(node, parentPath, out, nodeIndex) {
  const nodePath = `${parentPath}/node:${entityId(node, nodeIndex, "node")}`;
  const edges = node.edges || [];
  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    const edge = edges[edgeIndex];
    const edgePath = `${nodePath}/edge:${entityId(edge, edgeIndex, "edge")}`;
    const sections = edge.sections || [];
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex];
      const bendPoints = section.bendPoints || [];
      for (let bendIndex = 0; bendIndex < bendPoints.length; bendIndex++) {
        out.set(
          `${edgePath}/section:${sectionIndex}/bend:${bendIndex}`,
          pointFromShape(bendPoints[bendIndex])
        );
      }
    }
  }

  const children = Array.isArray(node.children) ? node.children : [];
  for (let index = 0; index < children.length; index++) {
    walkBendPoints(children[index], nodePath, out, index);
  }
}

function entityId(entity, index, prefix) {
  if (
    entity &&
    entity.id !== undefined &&
    entity.id !== null &&
    entity.id !== ""
  ) {
    return String(entity.id);
  }
  return `${prefix}:${index}`;
}

function sectionPoint(section, pointKind) {
  if (pointKind === "startPoint") {
    const startPoint = section.startPoint;
    return {
      x: numeric(startPoint.x),
      y: numeric(startPoint.y),
    };
  }

  const endPoint = section.endPoint;
  return {
    x: numeric(endPoint.x),
    y: numeric(endPoint.y),
  };
}

function pointFromShape(shape) {
  return {
    x: numeric(shape.x),
    y: numeric(shape.y),
  };
}

function numeric(value) {
  return Number.isFinite(value) ? value : 0;
}

function ensureSeed(graph, seed) {
  graph.layoutOptions = graph.layoutOptions || {};
  if (graph.layoutOptions["org.eclipse.elk.randomSeed"] === undefined) {
    graph.layoutOptions["org.eclipse.elk.randomSeed"] = seed;
  }
}

function writeTemporaryGraph(graphPath, graph) {
  const basename = path.basename(graphPath);
  const tempPath = path.join(
    os.tmpdir(),
    `elk-layout-equality-${process.pid}-${Date.now()}-${basename}`
  );
  fs.writeFileSync(tempPath, JSON.stringify(graph, null, 2));
  return tempPath;
}

function writeReport(reportDir, summary) {
  fs.mkdirSync(reportDir, { recursive: true });

  const timestamp = new Date()
    .toISOString()
    .replace(/[:]/g, "-")
    .replace(/[.]/g, "_");
  const reportPath = path.join(reportDir, `layout-equality-${timestamp}.json`);
  const latestPath = path.join(reportDir, "layout-equality-latest.json");
  const serialized = JSON.stringify(summary, null, 2);

  fs.writeFileSync(reportPath, serialized);
  fs.writeFileSync(latestPath, serialized);

  return reportPath;
}

function printTerminalSummary(summary, reportPath) {
  const totalGraphs = summary.graphs.length;
  const mismatchedGraphs = summary.graphs.filter((graph) => !graph.matches);
  const matchedGraphs = totalGraphs - mismatchedGraphs.length;

  console.log(
    `Layout equality smoke summary: ${matchedGraphs}/${totalGraphs} graph(s) matched.`
  );
  console.log(`Detailed report: ${reportPath}`);

  if (mismatchedGraphs.length === 0) {
    console.log("No mismatches found.");
    return;
  }

  console.log(`Mismatched graphs: ${mismatchedGraphs.length}`);
  for (const graph of mismatchedGraphs) {
    console.log(`- ${displayGraphPath(graph.graph)}`);
  }
}

function displayGraphPath(graphPath) {
  const relativePath = path.relative(process.cwd(), graphPath);
  if (
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath)
  ) {
    return relativePath;
  }

  return graphPath;
}

function ensureFile(filePath, hint) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}. ${hint}`);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function safeTerminate(elkInstance) {
  if (!elkInstance || typeof elkInstance.terminateWorker !== "function") {
    return;
  }

  try {
    elkInstance.terminateWorker();
  } catch (error) {
    if (
      !/terminate is not a function/.test(
        String(error && error.message ? error.message : error)
      )
    ) {
      throw error;
    }
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
