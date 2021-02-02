const { performance } = require('./performance')
const { measure } = require('./measure')
const Stopwatch = require('./stopwatch')
const ReportGenerator = require('./report-generator')

module.exports = {
    measure: measure,
    performance: performance,
    Stopwatch: Stopwatch,
    ReportGenerator: ReportGenerator
}