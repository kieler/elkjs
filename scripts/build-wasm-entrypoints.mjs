import { build } from "esbuild";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));

const shared = {
  bundle: true,
  format: "esm",
  target: "es2022",
  logLevel: "info",
};

const entrySource = `
import { createELKFactory } from './create-elk-core.mjs'
import { loadBridge } from '@elkjs-runtime-loader'

const { createELK } = createELKFactory(loadBridge)

export default createELK
export { createELK }
`;

const runtimeLoaderPlugin = (loaderPath) => ({
  name: `runtime-loader-${loaderPath}`,
  setup(buildApi) {
    buildApi.onResolve({ filter: /^@elkjs-runtime-loader$/ }, () => ({
      path: fileURLToPath(new URL(loaderPath, import.meta.url)),
    }));
    buildApi.onResolve({ filter: /^@elkjs-wasm-runtime$/ }, () => ({
      path: "./wasm/elkjs-wasm.wasm-runtime.mjs",
      external: true,
    }));
  },
});

await Promise.all([
  build({
    ...shared,
    platform: "browser",
    stdin: {
      contents: entrySource,
      resolveDir: `${rootDir}/src/wasm/js`,
      sourcefile: "wasm-entry.mjs",
    },
    outfile: `${rootDir}/lib/wasm.mjs`,
    plugins: [runtimeLoaderPlugin("../src/wasm/js/runtime-loader-browser.mjs")],
  }),
  build({
    ...shared,
    platform: "node",
    stdin: {
      contents: entrySource,
      resolveDir: `${rootDir}/src/wasm/js`,
      sourcefile: "wasm-entry.mjs",
    },
    outfile: `${rootDir}/lib/wasm-node.mjs`,
    plugins: [runtimeLoaderPlugin("../src/wasm/js/runtime-loader-node.mjs")],
  }),
]);
