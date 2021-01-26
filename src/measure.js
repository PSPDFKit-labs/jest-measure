const BenchmarkTest = require('./benchmark-test')

function measure(name, fn) {
    const benchmark = new BenchmarkTest(fn);
    const context = test(name, async () => {
        const metrics = await benchmark.run()
        console.log(metrics);
    });
}

module.exports = {
    measure: measure
}