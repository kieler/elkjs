/*******************************************************************************
 * Copyright (c) 2024 Kiel University and others.
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

const ELK = require('../../lib/main.js');
const elk = new ELK();

describe('Number support for identifiers and layout option values', function () {
	describe('#layout(...)', function () {
		it('Layout identifiers should accept number identifiers', function () {
			return elk.layout(numberIdentifierGraph)
				.should.eventually.be.fulfilled;
		})

		it('Layout option values should accept number', function () {
			return elk.layout(numberOptionGraph)
				.should.eventually.be.fulfilled;
		})
	})
})

const numberIdentifierGraph = {
	id: 'root',
	layoutOptions: {},
	children: [
		{ id: 1, width: 30, height: 30 },
		{ id: 2, width: 30, height: 30 },
		{ id: 3, width: 30, height: 30 }
	],
	edges: [
		{ id: 'e1', sources: [1], targets: [2] },
		{ id: 'e2', sources: [1], targets: [3] }
	]
};

const numberOptionGraph = {
	id: 'root',
	layoutOptions: {
		'layered.spacing.nodeNodeBetweenLayers': 40
	},
	children: [
		{ id: '1', width: 30, height: 30 },
		{ id: '2', width: 30, height: 30 },
		{ id: '3', width: 30, height: 30 }
	],
	edges: [
		{ id: 'e1', sources: ['1'], targets: ['2'] },
		{ id: 'e2', sources: ['1'], targets: ['3'] }
	]
};
