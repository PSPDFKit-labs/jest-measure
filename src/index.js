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
    const ReportFormatter = require('./report-formatter')

    return {
        ReportFormatter: ReportFormatter
    }
}

module.exports = (isJest()) ? exportForJest() : exportForNode()
