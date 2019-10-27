const Colors = require("./colors.js");
const Performance = require("./performance");

const NS_PER_SEC = 1e9;
module.exports = class SimpleMatrix {
    constructor(size){
        this.matrix = this.buildMatrix(size)
    }

    checkPertformance(num){
        let r2 = this.readColumn(num)
        let r1 = this.readRow(num)
        let result = r2 - r1
        let color = Colors.fgGreen()
        if(result<0) {
           color = Colors.fgRed()
        }
        console.log(color, `The difference between row and column search is ${result} ms`, Colors.fgWhite())
        Performance.checkCPU("Matrix Build")
    }

    buildMatrix(size){
        let rows = []
        for(let i = 0; i<size; i++){
            let row = []
            for(let i = 0; i<size; i++){
                row[i] = i + 1
            }
           // console.log(`row #${i+1} : ${row}`)  
            rows[i] = row
        }
        // console.log(`# rows : ${rows.length}`)  
        // console.log(`# cols : ${rows[0].length}`)  
        return rows
    }

    readColumn(colNum){
        let procName = "column"
        let t0 = process.hrtime();
        if(colNum <= 0){
            console.log("Error! such column doesn't exist")
        }
        colNum = colNum - 1
        let column = []
        for(let row = 0; row < this.matrix.length; row ++) {
           column[row] = this.matrix[row][colNum]
        }
        let t1 = process.hrtime(t0);
        // checkMemoryUsage(procName)
        Performance.checkMemoryUsage("COL")
        Performance.checkCPUUsage("COL")
        return logPerformance(procName, t1)
        // console.log(`# column : ${column}`)  
    }
    
     readRow(rowNum){
        let procName = "row"
        let t0 = process.hrtime();
        if(rowNum <= 0){
            console.log("Error! such rowNum doesn't exist")
        }
        rowNum = rowNum - 1
        let row = []
        for(let col=0; col< this.matrix[rowNum].length; col++){
            row[col] =  this.matrix[rowNum][col]
        }
        let t1 =process.hrtime(t0);
        // checkMemoryUsage(procName)
        Performance.checkMemoryUsage("ROW")
        Performance.checkCPUUsage("ROW")
        return logPerformance("row", t1)
       // console.log(`# row : ${row}`)  
    }

    
}


let logPerformance = (procName, diff) => {
    // console.log(`# column performance : \n start: ${start} \n end: ${end} \n duration ${calDuration(start, end)}`) 
    calDiff = diff[0] * NS_PER_SEC + diff[1]
    console.log(Colors.fgYellow(), `${procName}  : benchmark took ${calDiff} nanoseconds`,  Colors.fgWhite());
    return calDiff
}