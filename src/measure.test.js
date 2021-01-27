const { measure } = require('./measure')
const Stopwatch = require('./stopwatch')
const { performance } = require('./performance')

measure('A basic result test example', () => {
    return {
        metric: 10
    }
})

measure('A basic measure test example', async () => {
    const s = new Stopwatch('hello');
    s.lap('world')
    s.measure()

    return {
        metric: 10
    }
})

describe('measure', () => {

    measure('A described measure test example', () => {
        const s = new Stopwatch('hello');
        s.lap('world')
        s.measure()

        return {
            metric: 10
        }
    })
})

