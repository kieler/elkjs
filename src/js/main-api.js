/*******************************************************************************
 * Copyright (c) 2021 Kiel University and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 * 
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
const ELK = require('./elk-api.js').default

Object.defineProperty(module.exports, "__esModule", {
  value: true
})
module.exports = ELK
ELK.default = ELK