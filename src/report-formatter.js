const {
    REPORT_FOLDER_NAME,
    REPORT_FILE_EXTENSION
} = require('./constants')

const glob = require('glob')
const fs = require('fs')

class ReportFormatter {
    constructor(fn) {
        this.fn = fn
    }

    formatReports() {

        const files = glob.sync(`**/${REPORT_FOLDER_NAME}/*.${REPORT_FILE_EXTENSION}`)

        const results = files.map((file) => {
            const reportContent = fs.readFileSync(file)
            const report = JSON.parse(reportContent)
            return report
        }).flat()

        const entries = results.map((result) => {
            const metrics = result.metrics
    
            const metricNames = Object.keys(metrics)
            return metricNames.map((metric) => {
                const fullName = `${result.name} > ${metric}`
                return [fullName, metrics[metric]]
            })
        }).flat()

        entries.forEach((entry) => {
            this.fn.apply(null, entry)
        })
    }
}

module.exports = ReportFormatter