/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * 
 * This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License 2.0 
 * which is available at https://www.eclipse.org/legal/epl-2.0/ 
 * 
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

const { clone, createElk, runtimeName, safeTerminate } = require("../support/runtime");

describe(`elkjs#63 (${runtimeName})`, function() {
  let elk;
  before(async function() {
    elk = await createElk();
  });
  after(function() {
    safeTerminate(elk);
  });

  describe('#layout()', function() {
    it('COFFMAN_GRAHAM layering should cope with selfloops.', function() {
      return elk.layout(clone(graph))
        .should.eventually.be.fulfilled
    })

  })
})

const graph = {
  id: "root",
  properties: {
      'algorithm': 'layered',
      'layering.strategy': 'COFFMAN_GRAHAM' },
  children: [
    { id: "n1", width: 30, height: 30 },
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 }
  ],
  edges: [
    { id: "e1", sources: [ "n1" ], targets: [ "n2" ] },
    { id: "e2", sources: [ "n1" ], targets: [ "n3" ] },
    // this selfloop yields a stack overflow for <= 0.4.1
    { id: "e3", sources: [ "n1" ], targets: [ "n1" ] }
  ]
}