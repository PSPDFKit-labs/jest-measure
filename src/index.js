const { performance } = require('./performance')
const { measure } = require('./measure')
const Stopwatch = require('./stopwatch')
const ReportGenerator = require('./report-generator')

function isJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}

module.exports = (isJest()) ? 
{
    measure: measure,
    performance: performance,
    Stopwatch: Stopwatch,
    ReportGenerator: ReportGenerator
} : {
    ReportGenerator: ReportGenerator
}