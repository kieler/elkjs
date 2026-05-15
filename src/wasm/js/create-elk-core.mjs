const DEFAULT_ALGORITHMS = [
  "layered",
  "stress",
  "mrtree",
  "radial",
  "force",
  "disco",
  "sporeOverlap",
  "sporeCompaction",
  "rectpacking",
];

export function createELKFactory(loadBridge) {
  class DirectELK {
    constructor({
      defaultLayoutOptions = {},
      algorithms = DEFAULT_ALGORITHMS,
      locateFile,
    } = {}) {
      this.defaultLayoutOptions = defaultLayoutOptions;
      this.algorithms = algorithms;
      this.locateFile = locateFile;
    }

    async initialize() {
      await this.dispatch({
        cmd: "register",
        algorithms: this.algorithms,
      });
      return this;
    }

    async layout(
      graph,
      {
        layoutOptions = this.defaultLayoutOptions,
        logging = false,
        measureExecutionTime = false,
      } = {}
    ) {
      if (!graph) {
        throw new Error("Missing mandatory parameter 'graph'.");
      }

      const result = await this.dispatch({
        cmd: "layout",
        graph,
        layoutOptions,
        options: {
          logging,
          measureExecutionTime,
        },
      });

      return replaceGraph(graph, result);
    }

    knownLayoutAlgorithms() {
      return this.dispatch({ cmd: "algorithms" });
    }

    knownLayoutOptions() {
      return this.dispatch({ cmd: "options" });
    }

    knownLayoutCategories() {
      return this.dispatch({ cmd: "categories" });
    }

    terminateWorker() {}

    async dispatch(message) {
      const bridge = await loadBridge({ locateFile: this.locateFile });
      const response = bridge.dispatch(message);
      if (response.error) {
        throw toError(response.error);
      }
      return response.data;
    }
  }

  async function createELK(options = {}) {
    const elk = new DirectELK(options);
    return elk.initialize();
  }

  return {
    DEFAULT_ALGORITHMS,
    DirectELK,
    createELK,
  };
}

function replaceGraph(target, source) {
  if (!source || target === source) {
    return source;
  }

  Object.keys(target).forEach((key) => {
    delete target[key];
  });
  Object.assign(target, source);
  return target;
}

function toError(payload) {
  const error = new Error(
    payload && payload.message ? payload.message : "ELK Wasm request failed."
  );
  if (payload && typeof payload === "object") {
    Object.keys(payload).forEach((key) => {
      error[key] = payload[key];
    });
  }
  return error;
}

export { DEFAULT_ALGORITHMS };
