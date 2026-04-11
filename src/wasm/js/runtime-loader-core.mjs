export function createLoadBridge({
  defaultLocateFile,
  resolveWasmLocation,
  runtimeModule,
}) {
  const bridgePromises = new Map();

  return async function loadBridge({ locateFile = defaultLocateFile } = {}) {
    const wasmLocation = resolveWasmLocation("elkjs-wasm.wasm", locateFile);
    const cacheKey = wasmLocation;

    if (!bridgePromises.has(cacheKey)) {
      const bridgePromise = loadBridgeImpl(wasmLocation).catch((error) => {
        bridgePromises.delete(cacheKey);
        throw error;
      });
      bridgePromises.set(cacheKey, bridgePromise);
    }

    return bridgePromises.get(cacheKey);
  };

  async function loadBridgeImpl(wasmLocation) {
    const loaded = await runtimeModule.wasmGC.load(wasmLocation, {});
    return loaded.exports;
  }
}
