const { performance } = require('./performance')

class Stopwatch {

    _currentLapName = null
    _segments = []
    _subwatches = []

    constructor(initialLapName) {

        if (initialLapName) {
            this._currentLapName = initialLapName
            performance.mark(this._currentLapName);
        }
    }

    lap(name) {
        performance.mark(name);

        this._segments.push([this._currentLapName, name])
        this._currentLapName = name
    }

    subStopwatchFromLastLap() {
        const stopwatch = new Stopwatch()
        stopwatch._currentLapName = this._currentLapName
        this._subwatches.push(stopwatch)

        return stopwatch
    }

    measure() {
        this._segments.forEach((segment) => {
            performance.measure(segment[1], segment[0], segment[1]);
        });

        this._subwatches.forEach((s) => s.measure())
    }
}

module.exports = Stopwatch