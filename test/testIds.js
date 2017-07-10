/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
var assert = require('assert');
var elkjs = require('../lib/elk.js')

describe('IDs', function() {
  describe('#layout()', function() {

    it('should return an error if id is not present', function(done) {
    	elkjs.layout({
    		graph: {  },
				callback: function(err, graph) {
					assert(err instanceof Error);
					done();
				}
			});
    });

    it('should return an error if id is a non-integral number', function(done) {
    	elkjs.layout({
    		graph: { "id": 1.2 },
				callback: function(err, graph) {
					assert(err instanceof Error);
					done();
				}
			});
    });

    it('should return an error if id is an array', function(done) {
    	elkjs.layout({
    		graph: { "id": [] },
				callback: function(err, graph) {
					assert(err instanceof Error);
					done();
				}
			});
    });

    it('should return an error if id is an object', function(done) {
    	elkjs.layout({
    		graph: { "id": {} },
				callback: function(err, graph) {
					assert(err instanceof Error);
					done();
				}
			});
    });

    it('should return an error if id is a boolean', function(done) {
    	elkjs.layout({
    		graph: { "id": true },
				callback: function(err, graph) {
					assert(err instanceof Error);
					done();
				}
			});
    });

		it('should return no error if id is a string', function(done) {
    	elkjs.layout({
    		graph: { "id": "x" },
				callback: function(err, graph) {
					assert(err === null);
					done();
				}
			});
    });

		it('should return no error if id is an integer', function(done) {
    	elkjs.layout({
    		graph: { "id": 2 },
				callback: function(err, graph) {
					assert(err === null);
					done();
				}
			});
    });

  });
});

