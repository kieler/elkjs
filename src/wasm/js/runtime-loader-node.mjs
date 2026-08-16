import path from "node:path";
import { fileURLToPath } from "node:url";
import TeaVM from "@elkjs-wasm-runtime";
import { createLoadBridge } from "./runtime-loader-core.mjs";

function defaultLocateFile(name) {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), "wasm", name);
}

function resolveWasmPath(name, locateFile = defaultLocateFile) {
  const resolved = locateFile(name);

  if (resolved instanceof URL) {
    if (resolved.protocol !== "file:") {
      throw new TypeError(
        `locateFile('${name}') must resolve to a file: URL or filesystem path in Node.`
      );
    }
    return fileURLToPath(resolved);
  }

  if (typeof resolved !== "string") {
    throw new TypeError(
      `locateFile('${name}') must return a string path or URL.`
    );
  }

  if (resolved.startsWith("file://")) {
    return fileURLToPath(resolved);
  }

  if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(resolved)) {
    throw new TypeError(
      `locateFile('${name}') must resolve to a file: URL or filesystem path in Node.`
    );
  }

  return path.resolve(resolved);
}

export const loadBridge = createLoadBridge({
  defaultLocateFile,
  resolveWasmLocation: resolveWasmPath,
  runtimeModule: TeaVM,
});
