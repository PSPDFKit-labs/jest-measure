const BenchmarkTest = require('./benchmark-test')

class BenchmarkRunner {

    warmUpResults = []
    benchmarkResults = []

    constructor(fn, options) {
        this.fn = fn
        this.options = options
    }

    runIteration() {
        const benchmark = new BenchmarkTest(this.fn)
        return benchmark.run()
    }

    async start() {

        for(let i = 0; i < this.options.warmUpRounds; i ++) {
            this.warmUpResults.push(await this.runIteration())
        }

        for(let i = 0; i < this.options.benchmarkRounds; i ++) {
            this.benchmarkResults.push(await this.runIteration())
        }
    }
}

module.exports = BenchmarkRunner