const Performance = require("./src/performance");
const SimpleMatrix = require("./src/bm.js");
const express = require('express')
const app = express()
const port = 3000
app.post('/:size', (req, res) => {
    // console.log("size ", req.params.size)
    let sm = new SimpleMatrix(req.params.size);
    let cm = Math.round(req.params.size / 2, 0)
    if (cm <= 0) {
        cm = 1
    }
    let pr = sm.checkPertformance(cm)
    let ps = Performance.checkCPU("post")
    let um = Performance.checkMemoryUsage("post")
    let cp = Performance.checkCPUUsage("post")
    cp((value)=> {
        res.send({matrixBuild: pr, post: {cpu: ps, usedMem: um, cpuUsage: `${value} %`}})
    })
})

app.get('/', function (req, res) {
    let gt = Performance.checkCPU("get")
    let um = Performance.checkMemoryUsage("get")
    let cp = Performance.checkCPUUsage("get")
    cp((value)=>{
        res.send({get: {cpu: gt, usedMem: um,  cpuUsage: `${value} %`}})
    })
})


app.listen(port)
Performance.checkMemoryUsage("service")
console.log(`listeing at http://localhost: ${port}`)