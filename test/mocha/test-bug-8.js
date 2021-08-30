/*******************************************************************************
 * Copyright (c) 2021 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
chai.should()

const ELK = require('../../lib/main.js')
const elk = new ELK()

describe('elkjs#8', function() {
  describe('#layout()', function() {

    it('should not add edge sections for simple bottom-up layout ', function() {
      // Note:
      // We used to test the following here:
      //   "the edge with the id "a1:0" should have no edge sections since it requires hierarchical layout"
      // Since ELK decided to raise an exception for certain invalidly structured graphs, 
      // the test has been adjusted as below. 
      return elk.layout(graph, {
        layoutOptions: { 'hierarchyHandling': 'SEPARATE_CHILDREN'}
      }).should.eventually.be.rejectedWith(Error)
      .and.eventually.have.property('message')
      .that.satisfies(msg => msg.indexOf("org.eclipse.elk.core.UnsupportedGraphException") !== -1)
    })

    it('should not add edge sections for simple bottom-up layout (primitive edge format)', function() {
      // Note: 
      // Same change as for the test above.
      return elk.layout(graphPrimitiveEdgeFormat, {
        layoutOptions: { 'hierarchyHandling': 'SEPARATE_CHILDREN'}
      }).should.eventually.be.rejectedWith(Error)
      .and.eventually.have.property('message')
      .that.satisfies(msg => msg.indexOf("org.eclipse.elk.core.UnsupportedGraphException") !== -1)
    })

    it('should add edge sections for hierarchical layout', function() {
      return elk.layout(graph, {
        layoutOptions: { 'hierarchyHandling': 'INCLUDE_CHILDREN'}
      }).should.eventually.be.fulfilled
        .then(function (graph) {
          // the edge with the id "a1:0" should have one edge section
          const edgeSections = graph.children[0].edges[0].sections
          expect(edgeSections).to.exist
          expect(edgeSections).to.have.an('array').that.has.lengthOf(1)
          const firstSection = edgeSections[0]
          expect(firstSection).to.have.property('startPoint')
          expect(firstSection).to.have.property('endPoint')
        })
    })

    it('should add edge sections for hierarchical layout (primitive edge format)', function() {
      return elk.layout(graphPrimitiveEdgeFormat, {
        layoutOptions: { 'hierarchyHandling': 'INCLUDE_CHILDREN'}
      }).should.eventually.be.fulfilled
        .then(function (graph) {
          // the edge with the id "a1:0" should have one edge section
          const edgeSections = graph.children[0].edges[0].sections
          expect(edgeSections).to.exist
          expect(edgeSections).to.have.an('array').that.has.lengthOf(1)
          const firstSection = edgeSections[0]
          expect(firstSection).to.have.property('startPoint')
          expect(firstSection).to.have.property('endPoint')
        })
    })

  })
})

const graph = {
  "id": "root",
  "children": [
    {
      "id": "A",
      "children": [
        { "id": "a1" },
        { "id": "a2" },
        { "id": "$generated_A_initial_0" }
      ],
      "edges": [ { "id": "a1:0", "sources": [ "a1" ], "targets": [ "A" ] } ],
    },
    { "id": "$generated_root_initial_0" }
  ]
}

const graphPrimitiveEdgeFormat = {
  "id": "root",
  "children": [
    {
      "id": "A",
      "children": [
        { "id": "a1" },
        { "id": "a2" },
        { "id": "$generated_A_initial_0" }
      ],
      "edges": [ { "id": "a1:0", "source": "a1", "target": "A" } ],
    },
    { "id": "$generated_root_initial_0" }
  ]
}
