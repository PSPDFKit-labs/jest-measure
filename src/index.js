const { performance } = require('./performance')
const { measure } = require('./measure')

console.log(performance)

module.exports = {
    measure: measure,
    performance: performance
}