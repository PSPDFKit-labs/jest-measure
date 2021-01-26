
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