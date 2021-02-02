const { performance } = require('./performance')
const { measure } = require('./measure')
const { Stopwatch } = require('./stopwatch')

module.exports = {
    measure: measure,
    performance: performance,
    Stopwatch: Stopwatch
}