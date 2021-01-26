class StatisticAnalyser {

    constructor(results) {
        this._results = results
        
        const allKeys = this._results.map(Object.keys).flat()
        this._keys = new Set(allKeys)
    }

    _confidence(values, mean) {
        const n = values.length
    
        // Standard deviation
        const squareDiffs = values.reduce((squareDiffs, value) => {
        const diff = value - mean
        return squareDiffs + diff * diff
        }, 0)
    
        const std = Math.sqrt(squareDiffs / n)
    
        // Confidence
        return std / Math.sqrt(n)
    }

    analyseStat(name) {
        const values = this._results.map(result => result[name])
        const n = values.length

        const totalTime = values.reduce((sum, val) => sum + val, 0)
        const avg = totalTime / n

        // Margin of error (% of mean)
        //
        const error = (this._confidence(values, avg) / avg) * 100

        return {
            mean: avg,
            error: error,
            runs: n,
            totalTime: totalTime,
            min: Math.min(...values),
            max: Math.max(...values),
        }
    }

    analyse(results) {
        return [...this._keys].reduce((prev, key) => {
            prev[key] = this.analyseStat(key)
            return prev
        }, {})
    }
}

module.exports = StatisticAnalyser


  
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
  
//   function toFixed(value, decimalPlaces) {
//     return parseFloat(value.toFixed(decimalPlaces || 2))
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
  
//   /**
//    * Returns current high-resolution real time in milliseconds.
//    */
//   export function timestamp(): number {
//     // $FlowIssue hrtime definitely exists in node
//     const [seconds, nanos] = process.hrtime()
//     return toFixed(seconds * 1000 + nanos / 1000000)
//   }

  
//   function queryResultsByBenchmarkKey(values: Array<Object>, key: string): Array<number> {
//     return values.map(it => it[key])
//   }
 
  
//   type BenchmarkStatistics = {
//     /** Arithmetic mean value */
//     mean: number,
//     /** Margin of error (% of mean) */
//     error: number,
//     /** Number of benchmark runs. */
//     runs: number,
//     /** Total time of all benchmark runs. */
//     totalTime: number,
//     /** Fastest benchmark run. */
//     min: number,
//     /** Slowest benchmark run. */
//     max: number,
//   }
  
  
//   function toFixed(value: number, decimalPlaces: number = 2): number {
//     return parseFloat(value.toFixed(decimalPlaces))
//   }
  


// module.exports = {
//     DEFAULT_BENCHMARK_RESULTS_DIR: path.join('..', 'log', 'benchmark'),
//     DEFAULT_BENCHMARK_RESULTS_FILE: 'results.json',