const Colors = require("./colors.js");
const os = require('os');
const osutils = require('os-utils');

module.exports = class Performance {
    static checkMemoryUsage(procName){
        const used = process.memoryUsage();
        let usedMem = {}
        for (let key in used) {
            usedMem[key] =`${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`
            console.log(Colors.fgBlue(), `${procName} : ${key} ${usedMem[key]}`,  Colors.fgWhite());
          }
        return usedMem
    }

    static checkCPU(procName){
        let d = 1000000000
        let memoryUsage = {
           totalMem : os.totalmem()/d,
           freeMem  : os.freemem()/d
        }
        console.log(Colors.fgCyan(), 
        `${procName} :
            Total Mem : ${memoryUsage.totalMem}
            Free Mem: ${memoryUsage.freeMem}`,Colors.fgWhite());
        return memoryUsage
    }

    static checkCPUUsage(procName){
        return (callback) => {
            osutils.cpuUsage((v)=>{
                console.log( Colors.fgMagenta(),`${procName} CPU Usage (%): `+ v );
                callback(v)
            });
        }
    }


}