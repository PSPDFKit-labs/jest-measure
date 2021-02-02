const {
  REPORT_FOLDER_NAME,
  REPORT_FILE_EXTENSION
} = require('./constants')

const BenchmarkRunner = require('./benchmark-runner')
const ReportGenerator = require('./report-generator')
const path = require('path')
const globalOptions = require('./options')


expect.extend({
    toBeNoSlower(received, ceiling) {

      const pass = received.difference <= ceiling;

      if (pass) {
        return {
          message: () =>
            `expected ${received.name} to be no more than ${ceiling}% slower`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received.name} not to be more than ${ceiling}% slower but it was ${received.difference.toFixed(2)}% slower`,
          pass: false,
        };
      }
    },
  });

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
    const jestTest = jestRunner(name, async () => {
        await runner.start();

        const state = expect.getState()
        const testPath = path.parse(state.testPath);
        const reportPath = `${testPath.dir}/${REPORT_FOLDER_NAME}/${testPath.name}.${REPORT_FILE_EXTENSION}`

        const shouldUpdate = options.updateBenchmarks;
        const generator = new ReportGenerator(state.currentTestName, reportPath);
        const testDetails = generator.generateReport(runner.benchmarkResults, shouldUpdate);
        const metrics = testDetails.metrics
        const metricName = Object.keys(metrics)

        if (shouldUpdate) return;

        for (let metric of metricName) {
            const stats = metrics[metric]

            expect({
                name: metricName,
                difference: stats.difference
            }).toBeNoSlower(options.differenceThreshold)
        }
    });
}

module.exports = {
    measure: measure
}