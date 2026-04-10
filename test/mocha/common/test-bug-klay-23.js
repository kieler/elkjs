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

const ELK = require('../../lib/main.js')
const elk = new ELK()


const simpleGraph = {
  id: "root",
  layoutOptions: { 
    'elk.algorithm': 'layered',
    'elk.layered.crossingMinimization.strategy': 'INTERACTIVE'
  },
  children: [
    { id: "n1", width: 10, height: 10 },
    { id: "n2", width: 10, height: 10 }
  ],
  edges: [{
    id: "e1",
    sources: [ "n1" ],
    targets: [ "n2" ]
  },{
    id: "e2",
    sources: [ "n1" ],
    targets: [ "n2" ],
    sections: [{
      id: "es2",
      startPoint: { x: 0, y: 0 },
      bendPoints: [{ x: 20, y: 0 }],
      endPoint: { x: 50, y: 0 }
    }]
  }]
}

describe('klayjs#23', function() {
  describe('#layout(...)', function() {

    it('should be fine with unspecified bendpoints', function() {
      return elk.layout(simpleGraph)
        .should.eventually.be.fulfilled
    })

  })

})