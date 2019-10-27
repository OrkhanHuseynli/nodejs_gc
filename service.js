const Performance = require("./src/performance");
const SimpleMatrix = require("./src/bm.js");
const express = require('express')
const app = express()
const port = 3000
app.post('/:size', (req, res) => {
  // console.log("size ", req.params.size)
  let sm = new SimpleMatrix(req.params.size);
  let cm = Math.round(req.params.size/2,0)
  if(cm<=0){
    cm = 1
  }
  sm.checkPertformance(cm)
  res.send('hello world')
   Performance.checkCPU("post")
  Performance.checkMemoryUsage("post")
  Performance.checkCPUUsage("post")
})

app.get('/', function (req, res) {
  //checkPertformance(10000)
  res.send('hello world')
  Performance.checkCPU("bc")
  Performance.checkMemoryUsage("bc")
  Performance.checkCPUUsage("bc")
})


app.listen(port)
Performance.checkMemoryUsage("service")
console.log(`listeing at http://localhost: ${port}`)