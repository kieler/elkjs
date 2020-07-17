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

describe('Node.js-based layout', function() {

  describe('bundled', function() {
    const ELK = require('../../lib/main.js')
    const elk = new ELK()

    it('should succeed.', function() {
      return elk.layout(graph)
        .should.eventually.be.fulfilled
    })
  })

  describe('webworker', function() {
    const ELK = require('../../lib/main.js')
    const elk = new ELK({
      workerUrl: './lib/elk-worker.min.js'
    })

    it('should succeed.', function() {
      return elk.layout(graph)
        .should.eventually.be.fulfilled
        .then(() => elk.terminateWorker())
    })
  })

})

const graph = {
  id: "root",
  properties: { 'algorithm': 'layered' },
  children: [
    { id: "n1", width: 30, height: 30 },
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 }
  ],
  edges: [
    { id: "e1", sources: [ "n1" ], targets: [ "n2" ] },
    { id: "e2", sources: [ "n1" ], targets: [ "n3" ] }
  ]
}
