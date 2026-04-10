/*******************************************************************************
 * Copyright (c) 2018 Kiel University and others.
 * 
 * This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License 2.0 
 * which is available at https://www.eclipse.org/legal/epl-2.0/ 
 * 
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
const chai = require("chai")
const expect = chai.expect

const ELK = require('../../lib/main.js')
const elk = new ELK()

const graph = {
  id: 'root',
  children: [
    { id: 'n1', x: 20, y: 20, width: 10, height: 10 },
    { id: 'n2', x: 50, y: 50, width: 10, height: 10 }
  ],
  edges: [{ id: 'e1', sources: [ 'n1' ], targets: [ 'n2' ]  }]
}

const graphOverlapping = {
  id: 'root',
  children: [
    { id: 'n1', x: 20, y: 20, width: 10, height: 10 },
    { id: 'n2', x: 25, y: 25, width: 10, height: 10 }
  ],
  edges: [{ id: 'e1', sources: [ 'n1' ], targets: [ 'n2' ]  }]
}

describe('Layout Algorithms', function() {

  it('SPOrE Compaction', function() {
    return elk.layout(graph, {
      layoutOptions: {
        'algorithm': 'elk.sporeCompaction',
        'elk.spacing.nodeNode': 14,
        'elk.padding': '[left=2, top=2, right=2, bottom=2]'
      }
    }).should.eventually.be.fulfilled
      .then(function (graph) {
        expect(graph.children[0].x).to.equal(2)
        expect(graph.children[0].y).to.equal(2)
        expect(graph.children[1].x).to.equal(26)
        expect(graph.children[1].y).to.equal(26)
      })
  })

  it('SPOrE Overlap Removal', function() {
    return elk.layout(graphOverlapping, {
      layoutOptions: {
        'algorithm': 'elk.sporeOverlap',
        'elk.spacing.nodeNode': 13,
        'elk.padding': '[left=3, top=3, right=3, bottom=3]' }
    }).should.eventually.be.fulfilled
      .then(function (graph) {
        expect(graph.children[0].x).to.equal(3)
        expect(graph.children[0].y).to.equal(3)
        expect(graph.children[1].x).to.equal(26)
        expect(graph.children[1].y).to.equal(26)
      })
  })

  it('Rectangle Packing', function() {
    return elk.layout(graphOverlapping, {
      layoutOptions: {
        'algorithm': 'elk.rectpacking'
      }
    }).should.eventually.be.fulfilled
  })

})