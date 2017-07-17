/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var assert = chai.assert;
var expect = chai.expect;

const ELK = require('../../lib/main.js')
const elk = new ELK()

var simpleGraph = {
  			id: "root",
  			properties: { 'elk.direction': 'RIGHT' },
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

describe('Layout Options', function() {

  describe('#layout(...)', function() {

    it('should respect "options"', function() {
			return elk.layout(simpleGraph, {
    		layoutOptions: {
    			'org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers': 11
				}})
				.should.eventually.be.fulfilled
				.then(function (graph) {
					// left-to-right layout, thus same y coordinate but different x coordinates
					assert(graph.children[0].y == graph.children[0].y)
					assert(Math.abs(graph.children[0].x - graph.children[1].x) == 10 + 11)
				})
    })

		it('should not override concrete layout options', function() {
    	return elk.layout(simpleGraph, {
    		layoutOptions: {
    			'org.eclipse.elk.direction': 'DOWN'
    		}})
				.should.eventually.be.fulfilled
				.then(function (graph) {
					assert(graph.properties['elk.direction'] == 'RIGHT')
				  assert(Math.abs(graph.children[0].x - graph.children[1].x) > 0)
				  assert(graph.children[0].y == graph.children[1].y)
				})
    })

		it('should correctly parse ElkPadding', function() {
			let paddingGraph = {
				id: "root",
				properties: { 'elk.padding': '[left=2, top=3, right=3, bottom=2]' },
				children: [ { id: "n1", width: 10, height: 10 } ]
			}
    	return elk.layout(paddingGraph)
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
						properties: { position: "(23, 43)"}
					}
				]
			}
			return elk.layout(kvectorGraph, {
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
						properties: { bendPoints: "( {1,2}, {3,4} )"}
					}]
			}
			return elk.layout(kvectorchainGraph, {
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

  })
})