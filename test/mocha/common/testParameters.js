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

const ELK = require('../../lib/main.js')
const elk = new ELK()

describe('Parameters', function() {
  describe('#layout()', function() {

    it('should be rejected if graph is missing', function() {
      return elk.layout()
        .should.eventually.be.rejectedWith(Error)
    })

    it('should succeed if a graph is specified ', function() {
      return elk.layout({"id": 2})
        .should.eventually.be.fulfilled
    })

    // TODO test options object for proper type

  })
})