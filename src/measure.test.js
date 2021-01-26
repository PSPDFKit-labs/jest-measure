const { measure } = require('./measure')
const { performance } = require('./performance')

describe('measure', () => {

    measure('A basic measure test example', () => {
        performance.mark('hello')
        performance.mark('world')
        performance.measure('greeting', 'hello', 'world')
    })
})

