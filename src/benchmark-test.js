const { PerformanceObserver } = require('perf_hooks')

class BenchmarkTest {

    metrics = {}

    constructor(fn) {
        this.fn = fn
        this.run = this.run.bind(this)
    }

    async run() {

        const observer = new PerformanceObserver((list) => {

            const entries = list.getEntries()
            entries.forEach((entry) => {
                this.metrics[entry.name] = entry.duration
            })
        });

        observer.observe({
            entryTypes: ['measure'],
            buffered: false
        })

        const result = this.fn() || {}

        if (result instanceof Promise) {
            return result.then((result) => Object.assign({}, this.metrics, result))

        } else if (result !== null) {
            return Object.assign({}, this.metrics, result)

        } else {
            return this.metrics
        }
    }
}

module.exports = BenchmarkTest