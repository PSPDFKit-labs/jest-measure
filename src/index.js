function isJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}

function exportForJest() {

    const { performance } = require('./performance')
    const { measure } = require('./measure')
    const Stopwatch = require('./stopwatch')

    return {
        measure: measure,
        performance: performance,
        Stopwatch: Stopwatch
    }
}

function exportForNode() {
    const ReportGenerator = require('./report-generator')

    return {
        ReportGenerator: ReportGenerator
    }
}

module.exports = (isJest()) ? exportForJest() : exportForNode()
