/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
var assert = require('assert');
var elkjs = require('../lib/elk.js')

describe('Callback', function() {
	describe('#layout()', function() {

    it('should throw an error if missing', function() {
    	assert.throws(() => {
		    	elkjs.layout({
		    		graph: {}
					});
		    }
	    );
    });

    it('should not throw an error if available', function() {
    	assert.doesNotThrow(() => {
		    	elkjs.layout({
		    		callback: () => {}
					});
		    }
	    );
    });

		it('should return an error if graph is missing', function(done) {
    	assert.doesNotThrow(() => {
		    	elkjs.layout({
		    		callback: function(err, g) {
		    			assert.ok(err instanceof Error)
		    			done()
		    		}
					});
		    }
	    );
    });

    // it('should return an error if graph is not an object', function(done) {
    // 	assert.doesNotThrow(() => {
		  //   	elkjs.layout({
		  //   		graph: [],
		  //   		callback: function(err, g) {
		  //   			assert.ok(err instanceof Error)
		  //   			console.log(err)
		  //   			done()
		  //   		}
				// 	});
		  //   }
	   //  );
    // });

	});
});