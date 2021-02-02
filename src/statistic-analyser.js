class StatisticAnalyser {

    constructor(results) {
        this._results = results
        
        const allKeys = this._results.map(Object.keys).flat()
        this._keys = new Set(allKeys)
    }

    _confidence(values, mean) {
        const n = values.length
    
        // Standard deviation
        const squareDiffs = values.reduce((squareDiffs, value) => {
        const diff = value - mean
        return squareDiffs + diff * diff
        }, 0)
    
        const std = Math.sqrt(squareDiffs / n)
    
        // Confidence
        return std / Math.sqrt(n)
    }
  
    _calculateDifference(newValue, oldValue) {
        return newValue / oldValue - 1
    }

    analyseStat(name, oldStat) {
        const oldMean = (oldStat) ? oldStat.mean : null;
        const values = this._results.map(result => result[name])
        const n = values.length

        const totalTime = values.reduce((sum, val) => sum + val, 0)
        const avg = totalTime / n

        // Margin of error (% of mean)
        //
        const error = (this._confidence(values, avg) / avg) * 100
        const difference = (oldMean) ? this._calculateDifference(avg, oldMean) : 0

        return {
            mean: avg,
            error: error || 0,
            runs: n,
            totalTime: totalTime,
            min: Math.min(...values),
            max: Math.max(...values),
            difference: difference 
        }
    }

    analyse(oldResults) {
        return [...this._keys].reduce((prev, key) => {
            const oldStat = (oldResults) ? oldResults[key] : null
            prev[key] = this.analyseStat(key, oldStat)
            return prev
        }, {})
    }
}

module.exports = StatisticAnalyser
