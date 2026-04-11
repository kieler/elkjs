/*******************************************************************************
 * Copyright (c) 2020 Kiel University and others.
 * 
 * This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License 2.0 
 * which is available at https://www.eclipse.org/legal/epl-2.0/ 
 * 
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

const { clone, createElk, errorMatches, runtimeName, safeTerminate } = require("../support/runtime");

describe(`Exceptions (${runtimeName})`, function () {
  let elk;
  before(async function() {
    elk = await createElk();
  });
  after(function() {
    safeTerminate(elk);
  });

  describe('#layout()', function () {

    it('should report an unsupported configuration.', async function () {
      try {
        await elk.layout(clone(graph))
        throw new Error("Expected layout to fail.")
      } catch (error) {
        error.should.be.an.instanceOf(Error)
        errorMatches(error, "org.eclipse.elk.core.UnsupportedConfigurationException").should.equal(true)
      }
    })

  })
})


// A simple cycle for which it is not possible to have all nodes in the very first layer
const graph = {
  id: "root",
  properties: { 'algorithm': 'layered' },
  children: [
    { id: "n1", width: 30, height: 30, layoutOptions: { layerConstraint: "FIRST" } },
    { id: "n2", width: 30, height: 30, layoutOptions: { layerConstraint: "FIRST" } },
    { id: "n3", width: 30, height: 30, layoutOptions: { layerConstraint: "FIRST" } }
  ],
  edges: [
    { id: "e1", sources: ["n1"], targets: ["n2"] },
    { id: "e2", sources: ["n2"], targets: ["n3"] },
    { id: "e3", sources: ["n3"], targets: ["n1"] }
  ]
}
