/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
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


const simpleGraph = {
  id: "root",
  children: [
    { id: "n1", width: 100, height: 100, 
      labels: [ { id: "l1", text: "Label1" } ] },
    { id: "n2", width: 100, height: 100, 
      labels: [ { 
        id: "l2", 
        text: "Label2",
        properties: {
          'elk.nodeLabels.placement': 'INSIDE V_CENTER H_CENTER'
        } 
      }],
    }
  ],
  edges: [{
    id: "e1",
    sources: [ "n1" ],
    targets: [ "n2" ]
  }]
}

let globalLayoutOptions = {
  'elk.nodeLabels.placement': 'OUTSIDE V_TOP H_CENTER'
}

describe('klayjs#22', function() {
  describe('#layout(...)', function() {

	  it('should place labels according to set options', function() {
      return elk.layout(simpleGraph, {
        layoutOptions: globalLayoutOptions
      })
        .should.eventually.be.fulfilled
        .then(function (graph) {
          // OUTSIDE V_TOP H_CENTER
          expect(graph.children[0].labels[0].x).to.equal(50)
          expect(graph.children[0].labels[0].y).to.equal(-5)
          // INSIDE V_CENTER H_CENTER
          expect(graph.children[1].labels[0].x).to.equal(50)
          expect(graph.children[1].labels[0].y).to.equal(50)
        })
    })

  })
})