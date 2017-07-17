const ELK = require('../../lib/main.js')
const elk = new ELK({
  workerUrl: './lib/elk-worker.min.js'
})

const graph = {
  id: "root",
  properties: { 'algorithm': 'layered' },
  children: [
    { id: "n1", width: 30, height: 30 },
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 }
  ],
  edges: [
    { id: "e1", sources: [ "n1" ], targets: [ "n2" ] },
    { id: "e2", sources: [ "n1" ], targets: [ "n3" ] } 
  ]
}

elk.layout(graph)
	.then(console.log)
	.then(() => elk.terminateWorker())
