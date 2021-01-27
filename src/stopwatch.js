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

    time(fn) {
        performance.timerify(fn)
    }

    measure() {
        console.lo
        this._segments.forEach((segment) => {
            performance.measure(segment[1], segment[0], segment[1]);
        });
    }
}

module.exports = Stopwatch

//   /**
//    * Simple stopwatch implementation with lap ability.
//    */
//   export class Stopwatch {
//     _start: number
//     _startInterval: number
  
//     constructor() {
//       this.reset()
//     }
  
//     /** Returns time since last reset. */
//     current() {
//       return timestamp() - this._start
//     }
  
//     /** Returns time since last `lap()` call or since last reset if no interval call was done. */
//     lap() {
//       const intervalTime = timestamp() - this._startInterval
//       this._startInterval = timestamp()
//       return intervalTime
//     }
  
//     /** Resets the stopwatch */
//     reset() {
//       this._start = timestamp()
//       this._startInterval = this._start
//     }
//   }