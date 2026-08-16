/*******************************************************************************
 * Copyright (c) 2026 Kiel University and others.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const runtimeName = process.env.ELKJS_RUNTIME === "wasm" ? "wasm" : "gwt";

async function createElk(options = {}) {
  if (runtimeName === "wasm") {
    const wasmEntryPoint = pathToFileURL(
      path.join(__dirname, "../../../lib/wasm-node.mjs")
    ).href;
    const { createELK } = await import(wasmEntryPoint);
    return createELK(options);
  }

  const ELK = require("../../../lib/main.js");
  return new ELK(options);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function safeTerminate(elk) {
  if (!elk || typeof elk.terminateWorker !== "function") {
    return;
  }

  try {
    elk.terminateWorker();
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

function errorMatches(error, expectedType) {
  const message = String(error && error.message ? error.message : error);
  const type = error && error.type ? String(error.type) : "";
  return message.indexOf(expectedType) !== -1 || type === expectedType;
}

module.exports = {
  clone,
  createElk,
  errorMatches,
  runtimeName,
  safeTerminate,
};
