/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
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

const ELK = require('../../lib/main.js')
const elk = new ELK()


const simpleGraph = {
  "id": "0",
  "ports": [],
  "edges": [],
  "properties": {
    "org.eclipse.elk.algorithm": "layered",
    "org.eclipse.elk.edgeRouting": "ORTHOGONAL"
  },
  "children": [
    {
      "id": "1",
      "width": 100,
      "height": 20,
      "properties": {
        "org.eclipse.elk.portConstraints": "FIXED_ORDER"
      },
      "ports": [
        {
          "id": "2",
          "width": 20, "height": 10,
          "properties": {
            "side": "WEST",
            "index": 0
          }
        },
        {
          "id": "3",
           "width": 20, "height": 10,
          "properties": {
            "side": "EAST",
            "index": 1
          }
        }
      ],
      "edges": [
        {
          "id": "4",
          "sources": [
              "2"
          ],
          "targets": [
              "3"
          ]
        }
      ],
      "children": []
    }
  ]
}

let globalLayoutOptions = {
}

describe('elkjs#177', function() {
  describe('#layout(...)', function() {

    it('containment should be corrected and edge be correctly routed', function() {
      return elk.layout(simpleGraph, {
        layoutOptions: globalLayoutOptions
      })
        .should.eventually.be.fulfilled
        .then(function (graph) {
          console.log(graph)
          console.log("child", graph.children[0])
          console.log("edges", graph.children[0].edges)
          console.log("edge", graph.children[0].edges[0])
          console.log("edge", graph.children[0].edges[0])
          console.log("section", graph.children[0].edges[0].sections[0])
          expect(graph.children[0].edges[0].sections[0].startY == graph.children[0].edges[0].sections[0].bendPoints[0].y)
        })
    })

  })
})