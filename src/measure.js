const BenchmarkRunner = require('./benchmark-runner')
const StatisticAnalyser = require('./statistic-analyser')
const globalOptions = require('./options')

/**
 * An individual benchmark.
 *
 * @param name      Test description passed to jest's `describe` and used as identifier in test results.
 * @param fn        Function performing the benchmarking.
 * @param options   Benchmarking options, use this to tweak benchmark behavior.
 */
function measure(name, fn, options) {

    options = Object.assign({}, globalOptions, options)

    const runner = new BenchmarkRunner(fn, options);

    const jestRunner = (options.runBenchmarks === true) ? test : test.skip
    const context = jestRunner(name, async () => {
        await runner.start();

        const analyser = new StatisticAnalyser(runner.benchmarkResults);
        const metrics = analyser.analyse()
        console.log(metrics)
    });
}

// @todo

module.exports = {
    measure: measure
}