const fs = require('fs')
const path = require('path')
const os = require('os')

const StatisticAnalyser = require('./statistic-analyser')

class StatisticReporter {

    constructor(testName, reportPath) {
        this.testName = testName
        this.reportPath = reportPath
    }

    _readReport() {

        if (fs.existsSync(this.reportPath)) {
            const content = fs.readFileSync(this.reportPath)
            return JSON.parse(content)
        }

        return null
    }

    _writeReport(report) {
        const content = JSON.stringify(report)
        fs.writeFileSync(this.reportPath, content)
    }

    _calculateDifference() {

    }

    generateReport(results, shouldUpdate) {

        const reportFolder = path.dirname(this.reportPath)
        if (!fs.existsSync(reportFolder)) fs.mkdirSync(reportFolder)

        let originalReport = this._readReport() || []
        let originalTestDetails = originalReport.find(element => element.name = this.testName) || {};
        
        const analyser = new StatisticAnalyser(results);
        const metrics = analyser.analyse(originalTestDetails.metrics);
        
        let newTestDetails = {
            name: this.testName,
            metrics: metrics
        }

        if (shouldUpdate) {
            let newReport = originalReport.filter((e) => e !== originalTestDetails)
            newReport.push(newTestDetails)
            this._writeReport(newReport)
        }

        return newTestDetails
    }
}

module.exports = StatisticReporter
  