const uuid = require('uuid');
const { performance } = require('./performance')

class Stopwatch {

    _name = null
    _currentLapName = null
    _segments = []
    _subwatches = []

    constructor() {
        this.reset()
    }

    lap(lapName) {
        performance.mark(this._name + '-' + lapName);

        this._segments.push([this._currentLapName, lapName])
        this._currentLapName = lapName
    }

    subStopwatchFromLastLap() {
        const stopwatch = new Stopwatch()
        stopwatch._name = this._name
        stopwatch._currentLapName = this._currentLapName
        this._subwatches.push(stopwatch)

        return stopwatch
    }

    measure() {
        this._segments.forEach((segment) => {
            const startMark = this._name + '-' + segment[0]
            const endMark = this._name + '-' + segment[1]

            performance.measure(segment[1], startMark, endMark);
        });

        this._subwatches.forEach((s) => s.measure())
    }

    reset() {
        this.measure()

        this._name = uuid.v4()
        this._currentLapName = 'start'
        performance.mark(this._name + '-' + this._currentLapName);

        this._segments = []
        this._subwatches = []
    }
}

module.exports = Stopwatch