const Colors = require("./colors.js");
const os = require('os');
const osutils = require('os-utils');

module.exports = class Performance {
    static checkMemoryUsage(procName){
        const used = process.memoryUsage();
        for (let key in used) {
            console.log(Colors.fgBlue(), `${procName} : ${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`,  Colors.fgWhite());
          }
    }

    static checkCPU(procName){
        let d = 1000000000
        console.log(Colors.fgCyan(), 
        `${procName} :
            Total Mem : ${os.totalmem()/d}
            Free Mem: ${os.freemem()/d}`,Colors.fgWhite());
    }

    static checkCPUUsage(procName){
        osutils.cpuUsage((v)=>{
            console.log( Colors.fgMagenta(),`${procName} CPU Usage (%): `+ v );
        });
    }


}