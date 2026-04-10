/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
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

var assert = chai.assert;
var expect = chai.expect;

const { clone, createElk, errorMatches, runtimeName, safeTerminate } = require("../support/runtime");

var simpleGraph = {
        id: "root",
        layoutOptions: { 'elk.direction': 'RIGHT' },
        children: [
          { id: "n1", width: 10, height: 10 },
          { id: "n2", width: 10, height: 10 }
        ],
        edges: [{
          id: "e1",
          sources: [ "n1" ],
          targets: [ "n2" ]
      }]
    };

let elk;
let secondElk;

before(async function() {
  elk = await createElk();
  secondElk = await createElk({
    defaultLayoutOptions: {
      'elk.layered.spacing.nodeNodeBetweenLayers': 33
    }
  });
});

after(function() {
  safeTerminate(elk);
  safeTerminate(secondElk);
});

describe(`Layout Options (${runtimeName})`, function() {

  describe('#layout(...)', function() {

    it('should respect "options"', function() {
      return elk.layout(clone(simpleGraph), {
        layoutOptions: {
          'org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers': 11
        }})
        .should.eventually.be.fulfilled
        .then(function (graph) {
          // left-to-right layout, thus same y coordinate but different x coordinates
          assert(graph.children[0].y == graph.children[1].y)
          assert(Math.abs(graph.children[0].x - graph.children[1].x) == 10 + 11)
        })
    })

    it('should not override concrete layout options', function() {
      return elk.layout(clone(simpleGraph), {
        layoutOptions: {
          'org.eclipse.elk.direction': 'DOWN'
        }})
        .should.eventually.be.fulfilled
        .then(function (graph) {
          assert(graph.layoutOptions['elk.direction'] == 'RIGHT')
          assert(Math.abs(graph.children[0].x - graph.children[1].x) > 0)
          assert(graph.children[0].y == graph.children[1].y)
        })
    })

    it('should correctly parse ElkPadding', function() {
      let paddingGraph = {
        id: "root",
        layoutOptions: { 'elk.padding': '[left=2, top=3, right=3, bottom=2]' },
        children: [ { id: "n1", width: 10, height: 10 } ]
      }
      return elk.layout(clone(paddingGraph))
        .should.eventually.be.fulfilled
        .then(function (graph) {
          expect(graph.children[0].x).to.equal(2)
          expect(graph.children[0].y).to.equal(3)
          expect(graph.width).to.equal(15)
          expect(graph.height).to.equal(15)
        })
    })

    it('should correctly parse KVector', function() {
      let kvectorGraph = {
        id: "root",
        children: [
          {
            id: "n1", width: 10, height: 10,
            layoutOptions: { position: "(23, 43)"}
          }
        ]
      }
      return elk.layout(clone(kvectorGraph), {
        layoutOptions: { 
          algorithm: 'fixed' 
        }})
        .should.eventually.be.fulfilled
        .then(function (graph) {
          assert(graph.children[0].x == 23)
          assert(graph.children[0].y == 43)
        })
    })

    it('should correctly parse KVectorChain', function() {
      let kvectorchainGraph = {
          id: "root",
          children: [
            { id: "n1", width: 10, height: 10 },
            { id: "n2", width: 10, height: 10 }
          ],
          edges: [{
            id: "e1",
            sources: [ "n1" ],
            targets: [ "n2" ],
            layoutOptions: { bendPoints: "( {1,2}, {3,4} )"}
          }]
      }
      return elk.layout(clone(kvectorchainGraph), {
        layoutOptions: { 
          algorithm: 'fixed' 
      }})
      .should.eventually.be.fulfilled
      .then(function (graph) {
          expect(graph.edges[0].sections[0].startPoint.x).to.equal(1)
          expect(graph.edges[0].sections[0].startPoint.y).to.equal(2)
          expect(graph.edges[0].sections[0].endPoint.x).to.equal(3)
          expect(graph.edges[0].sections[0].endPoint.y).to.equal(4)
        })
    })

    it('should raise an exception for an invalid layouter id', async function() {
      let graph = {
        id: "root",
        children: [{ id: "n1", width: 10, height: 10 }],
        layoutOptions: { algorithm: "foo.bar.baz" }
      }
      try {
        await elk.layout(clone(graph))
        throw new Error("Expected layout to fail.")
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error)
        expect(errorMatches(error, "org.eclipse.elk.core.UnsupportedConfigurationException")).to.equal(true)
      }
    })
    
    it('should default to elk.layered if no layouter has been specified', function() {
      let graph = {
        id: "root",
        children: [{ id: "n1", width: 10, height: 10 }],
        layoutOptions: { }
      }
      return elk.layout(clone(graph))
        .should.eventually.be.fulfilled
        // Note that the following does not work as the resolved layout algorithm
        // is stored in an internal property within ELK that is not exposed after layout.
        // Hence, we have to be happy with this test case not raising an exception
        //.and.eventually.have.property('layoutOptions')
        //.that.has.property('algorithm')
        //.that.is.equal.to('org.eclipse.elk.layered');
    })
    
  })
})

describe(`Global Layout Options (${runtimeName})`, function() {

  describe('#layout(...)', function() {

    it('should respect global layout"', function() {
      return secondElk.layout(clone(simpleGraph))
        .should.eventually.be.fulfilled
        .then(function (graph) {
          // left-to-right layout, thus same y coordinate but different x coordinates
          assert(graph.children[0].y == graph.children[1].y)
          assert(Math.abs(graph.children[0].x - graph.children[1].x) == 10 + 33)
        })
    })

  })
})