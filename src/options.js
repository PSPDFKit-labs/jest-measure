const fs = require('fs');

const defaultOptions = {
    /** Number of real benchmarking rounds. */
    benchmarkRounds: 10,
    /** Number of rounds to run as warm-up. These are ignored from benchmarking statistics. */
    warmUpRounds: 0,
    /* The percentage threshold over which to treat a difference as an error. */
    differenceThreshold: 2,
    /** If benchmark tests should be ran */
    runBenchmarks: process.env.RUN_BENCHMARK === 'true' || process.env.UPDATE_BENCHMARK === 'true',
    /** If benchmark baseline should be updated */
    updateBenchmarks: process.env.UPDATE_BENCHMARK === 'true'
}

function parseOptions() {
    const path = process.cwd() + '/package.json'
    const packageContent = JSON.parse(
        fs.readFileSync(path)
    )
    const benchmarkOptions = packageContent['jestBenchmark'] || {}
    return Object.assign({}, defaultOptions, benchmarkOptions)
}


module.exports = parseOptions()