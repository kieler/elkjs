import TeaVM from "@elkjs-wasm-runtime";
import { createLoadBridge } from "./runtime-loader-core.mjs";

function defaultLocateFile(name) {
  return new URL(`./wasm/${name}`, import.meta.url);
}

function resolveWasmUrl(name, locateFile = defaultLocateFile) {
  const resolved = locateFile(name);

  if (resolved instanceof URL) {
    return resolved.toString();
  }

  if (typeof resolved !== "string") {
    throw new TypeError(
      `locateFile('${name}') must return a string path or URL.`
    );
  }

  return new URL(resolved, import.meta.url).toString();
}

export const loadBridge = createLoadBridge({
  defaultLocateFile,
  resolveWasmLocation: resolveWasmUrl,
  runtimeModule: TeaVM,
});
