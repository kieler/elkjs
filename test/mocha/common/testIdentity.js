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
chai.should();

const { createElk, runtimeName, safeTerminate } = require("../support/runtime");

describe(`Identity (${runtimeName})`, function () {
  let elk;

  before(async function () {
    elk = await createElk();
  });

  after(function () {
    safeTerminate(elk);
  });

  describe("#layout()", function () {
    it("should preserve nested object identity for in-place layout.", async function () {
      const child = { id: "n1", width: 30, height: 30 };
      const edge = { id: "e1", sources: ["n1"], targets: ["n2"] };
      const graph = {
        id: "root",
        layoutOptions: { "elk.algorithm": "layered" },
        children: [child, { id: "n2", width: 30, height: 30 }],
        edges: [edge],
      };
      const children = graph.children;
      const edges = graph.edges;

      const result = await elk.layout(graph);

      result.should.equal(graph);
      graph.children.should.equal(children);
      graph.edges.should.equal(edges);
      graph.children[0].should.equal(child);
      graph.edges[0].should.equal(edge);
    });
  });
});
