const ELK = require('./elk-api.js').default

class ELKNode extends ELK {
  constructor(options = {}) {
    const optionsClone = Object.assign({}, options)

    if (options.workerUrl) {
      var codependency = require('codependency');
      var requirePeer = codependency.register(module);
      const { Worker } = requirePeer('webworker-threads')
      optionsClone.workerFactory = function (url) { return new Worker(url) }
    } else {
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
