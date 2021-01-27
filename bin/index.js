#!/usr/bin/env node

const {
    REPORT_FOLDER_NAME,
    REPORT_FILE_EXTENSION
  } = require('../src/constants')

const glob = require("glob")
const fs = require('fs')
const yargs = require("yargs")

glob(`**/${REPORT_FOLDER_NAME}/*.${REPORT_FILE_EXTENSION}`, (er, files) => {

    const results = files.map((file) => {
        const reportContent = fs.readFileSync(file)
        const report = JSON.parse(reportContent)
        return report
    }).flat()

    results.forEach((result) => {
        const metrics = result.metrics
        console.log(result)

        // Build option to pass in formatters like cli and markdown
        //
        const formatter = (metric, stats) => {
            console.log(`${metric} took ${stats.totalTime}`);
        }

        const metricNames = Object.keys(metrics)
        metricNames.forEach((metric) => {
            const fullName = `${result.name} > ${metric}`
            formatter(fullName, metrics[metric])
        })
    })
})

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
  
//   function arePrimitiveArraysEqual(a, b) {
//     return (
//       Array.isArray(a) &&
//       Array.isArray(b) &&
//       a.length === b.length &&
//       a.every((val, idx) => val === b[idx])
//     )
//   }
  