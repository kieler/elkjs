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

const ELK = require('../../lib/main.js')
const elk = new ELK()

describe('IDs', function() {
  describe('#layout(...)', function() {

    it('should return no error if id is a string', function() {
      return elk.layout({ "id": "x" })
        .should.eventually.be.fulfilled
    })

    it('should return no error if id is an integer', function() {
      return elk.layout({ "id": 2 })
        .should.eventually.be.fulfilled
    })
    
    it('should return an error if id is not present', function() {
      return elk.layout({ })
        .should.eventually.be.rejected
    })

    it('should return an error if id is a non-integral number', function() {
      return elk.layout({ "id": 1.2 })
        .should.eventually.be.rejected
    })
      
    it('should return an error if id is an array', function() {
      return elk.layout({ "id": [] })
        .should.eventually.be.rejected
    })
      
    it('should return an error if id is an object', function() {
      return elk.layout({ "id": {} })
        .should.eventually.be.rejected
    })
      
    it('should return an error if id is a boolean', function() {
      return elk.layout({ "id": true })
        .should.eventually.be.rejected
    })
          
  })
})

