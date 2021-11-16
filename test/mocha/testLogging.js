/*******************************************************************************
 * Copyright (c) 2019 Kiel University and others.
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

const ELK = require('../../lib/main.js')
const elk = new ELK()

const simpleGraph = {
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

describe('Logging', function() {

  describe('#layout(...)', function() {

    it('should provide logs if requested to.', function() {
      return elk.layout(simpleGraph, {
        layoutOptions: {
          'algorithm': 'stress'
        },
        logging: true
      })
        .should.eventually.be.fulfilled
        .then(function (graph) {
          expect(graph.logging).not.to.be.undefined
          // there should be at least one child ...
          expect(graph.logging.children).not.to.be.undefined
          // execution times should _not_ be included though
          expect(graph.logging.executionTime).to.be.undefined
        })
    })

    it('should not provide logs if not requested to.', function() {
      return elk.layout(simpleGraph, {
        logging: false
      })
        .should.eventually.be.fulfilled
        .then(function (graph) {
            expect(graph.logging).to.be.undefined
        })
    })

    it('should provide execution times if requested to.', function() {
      return elk.layout(simpleGraph, {
        layoutOptions: {
          'algorithm': 'layered'
        },
        measureExecutionTime: true
      })
        .should.eventually.be.fulfilled
        .then(function (graph) {
            expect(graph.logging).not.to.be.undefined
            expect(graph.logging.executionTime).not.to.be.undefined
        })
    })

    it('should not provide execution times if not requested to.', function() {
      return elk.layout(simpleGraph, {
        measureExecutionTime: false
      })
        .should.eventually.be.fulfilled
        .then(function (graph) {
            expect(graph.logging).to.be.undefined
        })
    })

    it('should not provide logging information by default.', function() {
      return elk.layout(simpleGraph)
        .should.eventually.be.fulfilled
        .then(function (graph) {
            expect(graph.logging).to.be.undefined
        })
    })

    it('should clear logging information from previous layout run.', function() {
      // First execute with logging
      return elk.layout(simpleGraph, {
        logging: true
      })
        .should.eventually.be.fulfilled
        .then(function (_) {
            // Since the layout is applied in-place, 'simpleGraph' should contain the logging information
            expect(simpleGraph.logging).not.to.be.undefined
            return simpleGraph;
        })
        // Apply layout a second time without logging
        .then(function(graph) {
          return elk.layout(graph)
        })
        .should.eventually.be.fulfilled
        .then(function (_) {
          expect(simpleGraph.logging).to.be.undefined
        })
    })

  })
})