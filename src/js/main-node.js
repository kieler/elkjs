/*******************************************************************************
 * Copyright (c) 2021 Kiel University and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 * 
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
const ELK = require('./elk-api.js').default

class ELKNode extends ELK {
  constructor(options = {}) {
    const optionsClone = Object.assign({}, options)

    let workerThreadsExist = false
    try {
      require.resolve('web-worker')
      workerThreadsExist = true
    } catch(e) { }

    // user requested a worker
    if (options.workerUrl) {
      if (workerThreadsExist) {
        const Worker = require('web-worker')
        optionsClone.workerFactory = function (url) { return new Worker(url) }
      } else {
        console.warn(`Web worker requested but 'web-worker' package not installed. 
Consider installing the package or pass your own 'workerFactory' to ELK's constructor.
... Falling back to non-web worker version.`)
      }
    } 
    
    // unless no other workerFactory is registered, use the fake worker
    if (!optionsClone.workerFactory) {
      const { Worker } = require('./elk-worker.min.js')
      optionsClone.workerFactory = function (url) { return new Worker(url) }
    }

    super(optionsClone)
  }
}

Object.defineProperty(module.exports, "__esModule", {
  value: true
})
module.exports = ELKNode
ELKNode.default = ELKNode
