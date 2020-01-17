/*******************************************************************************
 * Copyright (c) 2020 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

const ELK = require('../../lib/elk-api.js')
const elk = new ELK({
  workerFactory: function (_) {
    const { Worker } = require('../../lib/elk-worker.js');
    return new Worker();
  }
})


describe('Exceptions', function () {
  describe('#layout()', function () {

    it('should report an unsupported configuration.', function () {
      return elk.layout(graph)
        .should.eventually.be.rejectedWith(Error)
        .and.eventually.have.property('message')
        .that.satisfies(msg => msg.indexOf("org.eclipse.elk.core.UnsupportedConfigurationException") !== -1)
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
