#!/usr/bin/env node

const ReportFormatter = require('../src/report-formatter')
const Table = require('cli-table')

const table = new Table({
    head: [
        'Name',
        'Benchmark',
        'Min (ms)',
        'Mean (ms)',
        'Mean Error (%)',
        'Difference (%)'
    ]
});

const formatter = new ReportFormatter((metric, stats) => {

    let row = {};

    row[metric] = [
        stats.avg.toFixed(2),
        stats.min.toFixed(2),
        stats.mean.toFixed(2),
        stats.error.toFixed(2),
        stats.difference.toFixed(2)
    ];

    table.push(row)
})


formatter.formatReports()
console.log(table.toString());
