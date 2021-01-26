const { PerformanceObserver, performance } = require('perf_hooks')

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

                if (entry.entryType == 'function') {
                    this.metrics['total'] = entry.duration
                } else {
                    this.metrics[entry.name] = entry.duration
                }
            })
        });

        observer.observe({
            entryTypes: ['measure', 'function'],
            buffered: false
        })

        const wrapped = performance.timerify(this.fn);
        const promise = wrapped() || Promise.resolve()

        return promise.then(() => {
            return this.metrics
        })
    }
}

module.exports = BenchmarkTest