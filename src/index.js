const { fs } = require('fs')
const { performance } = require('./performance')
const { measure } = require('./measure')
const { error } = require('console')

module.exports = {
    measure: measure,
    performance: performance
}