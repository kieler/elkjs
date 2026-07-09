/*******************************************************************************
 * Copyright (c) 2021 Kiel University and others.
 * 
 * This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License 2.0 
 * which is available at https://www.eclipse.org/legal/epl-2.0/ 
 * 
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
chai.should()

const { clone, createElk, errorMatches, runtimeName, safeTerminate } = require("../support/runtime");

describe(`elkjs#8 (${runtimeName})`, function() {
  let elk;
  before(async function() {
    elk = await createElk();
  });
  after(function() {
    safeTerminate(elk);
  });

  describe('#layout()', function() {

    it('should not add edge sections for simple bottom-up layout ', async function() {
      // Note:
      // We used to test the following here:
      //   "the edge with the id "a1:0" should have no edge sections since it requires hierarchical layout"
      // Since ELK decided to raise an exception for certain invalidly structured graphs, 
      // the test has been adjusted as below. 
      try {
        await elk.layout(clone(graph), {
          layoutOptions: { 'hierarchyHandling': 'SEPARATE_CHILDREN'}
        })
        throw new Error("Expected layout to fail.")
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error)
        expect(errorMatches(error, "org.eclipse.elk.core.UnsupportedGraphException")).to.equal(true)
      }
    })

    it('should not add edge sections for simple bottom-up layout (primitive edge format)', async function() {
      // Note: 
      // Same change as for the test above.
      try {
        await elk.layout(clone(graphPrimitiveEdgeFormat), {
          layoutOptions: { 'hierarchyHandling': 'SEPARATE_CHILDREN'}
        })
        throw new Error("Expected layout to fail.")
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error)
        expect(errorMatches(error, "org.eclipse.elk.core.UnsupportedGraphException")).to.equal(true)
      }
    })

    it('should add edge sections for hierarchical layout', function() {
      return elk.layout(clone(graph), {
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
      return elk.layout(clone(graphPrimitiveEdgeFormat), {
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
