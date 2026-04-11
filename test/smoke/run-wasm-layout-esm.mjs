import fs from "node:fs/promises";
import path from "node:path";
import { createELK } from "elkjs/wasm";

async function main() {
  const graphPath = process.argv[2];
  if (!graphPath) {
    throw new Error(
      "Usage: node test/smoke/run-wasm-layout-esm.mjs <graph.json>"
    );
  }
  const resolvedGraphPath = path.resolve(graphPath);
  const text = await fs.readFile(resolvedGraphPath, "utf8");
  const graph = JSON.parse(text);

  const elk = await createELK();
  try {
    const result = await elk.layout(graph);
    console.log(
      JSON.stringify(
        {
          graph: resolvedGraphPath,
          root: {
            id: result.id,
            x: result.x,
            y: result.y,
            width: result.width,
            height: result.height,
          },
          children: Array.isArray(result.children) ? result.children.length : 0,
          edges: Array.isArray(result.edges) ? result.edges.length : 0,
        },
        null,
        2
      )
    );
  } finally {
    elk.terminateWorker();
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
