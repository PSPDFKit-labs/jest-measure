const { performance } = require('./performance')

class Stopwatch {

    currentLapName = null
    segments = []

    constructor(initialLapName) {
        this.currentLapName = initialLapName
    }

    lap(name) {
        performance.mark(name);

        this.segments.push([this.currentLapName, name])
        this.currentLapName = name
        
        return new Stopwatch(name)
    }

    measure() {
        this.segments.forEach((segment) => {
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