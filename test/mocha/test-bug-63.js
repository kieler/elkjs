/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

const ELK = require('../../lib/main.js')
const elk = new ELK()

describe('elkjs#63', function() {
  describe('#layout()', function() {

    it('COFFMAN_GRAHAM layering should cope with selfloops.', function() {
      return elk.layout(graph)
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