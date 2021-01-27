const fs = require('fs')
const path = require('path')
const os = require('os')

const StatisticAnalyser = require('./statistic-analyser')

class StatisticReporter {

    constructor(testName, reportPath) {
        this.testName = testName
        this.reportPath = reportPath
    }

    _readReport() {

        if (fs.existsSync(this.reportPath)) {
            const content = fs.readFileSync(this.reportPath)
            return JSON.parse(content)
        }

        return null
    }

    _writeReport(report) {
        const content = JSON.stringify(report)
        fs.writeFileSync(this.reportPath, content)
    }

    _calculateDifference() {

    }

    generateReport(results, shouldUpdate) {

        const reportFolder = path.dirname(this.reportPath)
        if (!fs.existsSync(reportFolder)) fs.mkdirSync(reportFolder)

        let originalReport = this._readReport() || []
        let originalTestDetails = originalReport.find(element => element.name = this.testName) || {};
        
        const analyser = new StatisticAnalyser(results);
        const metrics = analyser.analyse(originalTestDetails.metrics);
        
        let newTestDetails = {
            name: this.testName,
            metrics: metrics
        }

        if (shouldUpdate) {
            let newReport = originalReport.filter((e) => e !== originalTestDetails)
            newReport.push(newTestDetails)
            this._writeReport(newReport)
        }

        return newTestDetails
    }
}

module.exports = StatisticReporter
  
//     calculateDiffFromBaseline: (newResults, baseline, diffProperties) => {
//       // This argument defines names of measurement keys that should be compared to baseline.
//       const propsToDiff = diffProperties || ['min', 'mean']
  
//       // Make a deep copy of newResults.
//       const results = JSON.parse(JSON.stringify(newResults))
  
//       Object.keys(results).forEach(key => {
//         let measurements = results[key]
//         const measurementsBaseline = baseline[key]
//         if (measurements && measurementsBaseline) {
//           Object.keys(measurements).forEach(measurementKey => {
//             const measurement = measurements[measurementKey]
//             const measurementBaseline = measurementsBaseline[measurementKey]
//             if (measurement && measurementBaseline) {
//               measurement.baselineDiff = {}
//               for (const prop of propsToDiff) {
//                 measurement.baselineDiff[prop] = toFixed(
//                   calculatePercentualDifference(measurement[prop], measurementBaseline[prop]),
//                 )
//               }
//             }
//           })
//         }
//       })
//       return results
//     },
  
//     printBenchmarkResults: results => {
//       let baselineDiffProps = null
//       const items = Object.keys(results)
//         .sort()
//         .flatMap(benchmarkKey => {
//           const measurements = results[benchmarkKey]
//           return Object.keys(measurements).map(measurementKey => {
//             const measurement = measurements[measurementKey]
  
//             const row = [
//               `${benchmarkKey} > ${measurementKey}`,
//               measurement.min,
//               measurement.mean,
//               measurement.error <= 5 ? chalk.green(measurement.error) : chalk.red(measurement.error),
//             ]
  
//             if (measurement.baselineDiff) {
//               if (!baselineDiffProps) {
//                 baselineDiffProps = Object.keys(measurement.baselineDiff)
//               } else if (
//                 !arePrimitiveArraysEqual(baselineDiffProps, Object.keys(measurement.baselineDiff))
//               ) {
//                 throw new Error(
//                   `Baseline difference data must have the same shape for all measurements! Expected: ${baselineDiffProps} Was: ${Object.keys(
//                     measurement.baselineDiff,
//                   )}`,
//                 )
//               }
//               Object.keys(measurement.baselineDiff).forEach(prop => {
//                 const value = measurement.baselineDiff[prop]
//                 row.push(Math.abs(value) <= 5 ? chalk.green(value) : chalk.red(value))
//               })
//             }
  
//             return row
//           })
//         })
  
//       const table = new Table({
//         head: [
//           'Benchmark',
//           'Min (ms)',
//           'Mean (ms)',
//           'Mean Error (%)',
//           ...(baselineDiffProps ? baselineDiffProps.map(it => `Diff ${it} (%)`) : []),
//         ].map(label => chalk.yellow.bold(label)),
//       })
//       table.push(...items)
//       console.log(table.toString())
//     },
  
//     printBenchmarkResultFile: resultsFile => {
//       resultsFile =
//         resultsFile ||
//         path.join(
//           module.exports.DEFAULT_BENCHMARK_RESULTS_DIR,
//           module.exports.DEFAULT_BENCHMARK_RESULTS_FILE,
//         )
//       if (!fs.existsSync(resultsFile)) {
//         throw new Error(`'${resultsFile}' does not exist`)
//       }
//       let results
//       try {
//         results = JSON.parse(fs.readFileSync(resultsFile).toString())
//       } catch (e) {
//         throw new Error(`'${resultsFile}' does not exist`)
//       }
//       module.exports.printBenchmarkResults(results)
//     },
//   }
  
//   function calculatePercentualDifference(newValue, oldValue) {
//     return (newValue / oldValue - 1) * 100
//   }
  
//   function arePrimitiveArraysEqual(a, b) {
//     return (
//       Array.isArray(a) &&
//       Array.isArray(b) &&
//       a.length === b.length &&
//       a.every((val, idx) => val === b[idx])
//     )
//   }
  
//   const DEFAULT_RESULTS_DIR = DEFAULT_BENCHMARK_RESULTS_DIR
//   const DEFAULT_RESULTS_FILE = DEFAULT_BENCHMARK_RESULTS_FILE
  
  
  
  
//   async function appendResults(file: string, newResults: Object) {
//     let results
//     try {
//       results = JSON.parse(fs.readFileSync(file).toString())
//     } catch (e) {
//       results = {}
//     }
  
//     const mergedResultsJSON = JSON.stringify(
//       {
//         ...results,
//         ...newResults,
//       },
//       null,
//       2,
//     )
  
//     fs.writeFileSync(file, mergedResultsJSON)
//   }