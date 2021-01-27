const { measure } = require('./measure')
const Stopwatch = require('./stopwatch')

measure('A basic measure test example', async () => {

    const s = new Stopwatch('hello');
    s.lap('world')
    s.measure()
})

describe('measure', () => {

    measure('A described measure test example', () => {
        const s = new Stopwatch('hello');
        s.lap('world')
        s.measure()
    })
})

