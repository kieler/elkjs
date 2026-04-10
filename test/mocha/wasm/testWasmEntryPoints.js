/*******************************************************************************
 * Copyright (c) 2026 Kiel University and others.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var fs = require("fs/promises");
var os = require("os");
var path = require("path");
chai.use(chaiAsPromised);
chai.should();

describe("Wasm entry points", function () {
  describe("direct wasm entry point", function () {
    it("should succeed.", async function () {
      const { createELK } = await import("elkjs/wasm");
      const elk = await createELK();
      const result = await elk.layout(JSON.parse(JSON.stringify(graph)));
      result.should.have.property("id", "root");
    });

    it("should evict failed bridge loads from the cache.", async function () {
      const { createELK } = await import("elkjs/wasm");
      const tempDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "elkjs-wasm-retry-")
      );
      try {
        const wasmPath = path.join(tempDir, "elkjs-wasm.wasm");
        const locateFile = () => wasmPath;

        let failed = false;
        try {
          await createELK({ locateFile });
        } catch (error) {
          failed = true;
        }
        failed.should.equal(true);
        await fs.copyFile(
          path.join(__dirname, "../../lib/wasm/elkjs-wasm.wasm"),
          wasmPath
        );

        const elk = await createELK({ locateFile });
        const result = await elk.layout(JSON.parse(JSON.stringify(graph)));
        result.should.have.property("id", "root");
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
      }
    });

    it("should reject non-file wasm locations in Node.", async function () {
      const { createELK } = await import("elkjs/wasm");
      await createELK({
        locateFile: () => "https://cdn.example.invalid/elkjs-wasm.wasm",
      }).should.be.rejectedWith(TypeError, "file: URL or filesystem path");
    });
  });
});

const graph = {
  id: "root",
  properties: { algorithm: "layered" },
  children: [
    { id: "n1", width: 30, height: 30 },
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 },
  ],
  edges: [
    { id: "e1", sources: ["n1"], targets: ["n2"] },
    { id: "e2", sources: ["n1"], targets: ["n3"] },
  ],
};
