const { performance } = require('./performance')

class Stopwatch {

    _currentLapName = null
    _segments = []

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

    stopwatchFromLastLap() {
        const stopwatch = new Stopwatch()
        stopwatch._currentLapName = this._currentLapName
        return stopwatch
    }

    measure() {
        this._segments.forEach((segment) => {
            performance.measure(segment[1], segment[0], segment[1]);
        });
    }
}

module.exports = Stopwatch