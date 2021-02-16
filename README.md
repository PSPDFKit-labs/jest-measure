# Jest Measure

The Jest Measure library implements APIs for writing benchmaks to profile and
verify the performance of your code when using
the Jest unit testing library.

# Getting Started

To get started simply install the library:

```
yarn add jest-measure
```

To write your first test just import the 
`measure` method from the library and use it
as you would use the normal `test` method.

```
const { measure } = require('jest-measure')

measure('your test name', () => {
    return {
        metricYouHaveMeasured: 1000
    }
})
```

The first time you run your test you we will
need to record a baseline to compare it against.

To do this just run `jest` with `UPDATE_BENCHMARK` set to `true`

```
UPDATE_BENCHMARK=true jest
```

This will generate the baseline metrics and store them under a 
`__benchmark__` folder in a similar manner to snapshot tests.

After this we can now run our benchmarks to check if the performance
has degraded.

By default benchmark don't run so we need to 
pass `RUN_BENCHMARK` with a value of `true`

```
RUN_BENCHMARK=true jest
```

We can get a table of our our baseline metrics by running 
the `jest-measure` command.

```
yarn run jest-measure
```

You will see the last updated list of benchmark tests
and the metrics we use to compare our tests with.

# Basic Usage

The easiest way to measure and return metrics to be compared is by
returning an dictionary containing the name and value of each metric.

```
const { measure } = require('jest-measure')

measure('A long method', () => {
    return {
        pageLoadTime: 10,
        totalTime: 1000
    }
})
```

The `pageLoadTime` and `totalTime` metrics will now appear in the list
of metrics when running `jest-measure`

# Performance API Usage

Jest measure supports using the Performance API to more accuratley
collect metrics.

Every call to `performance.measure` will automatically be collected and
added to the list of metrics when running `jest-measure`

```
const { performance, measure } = require('jest-measure')

measure('An async task', async () => {

    performance.mark('load')

    onLoad(() => {
        performance.mark('loaded')
    })

    await waitUntilLoaded()
    
    performance.measure('load-time', 'load', 'loaded')
})
```

# Measurement Objects

We also have the measurement objects which provide
a high level API to simplify the use of the performance API.

For example we can use a Stopwatch to measure the time taken between
key events in our application.

```
const { Stopwatch, measure } = require('jest-measure')

measure('An async task', async () => {

    const s = new Stopwatch()

    onLoad(() => {
        s.lap('loaded')
    })

    await waitUnitlLoaded()

    s.measure()
})
```

Sometimes the subject we are measuring can spawn concurrent operations we need to measure independently.

We can use sub stopwatches for this which will allow you
to measure the time between laps starting from the last
lap of the main stopwatch.

```
const { Stopwatch, measure } = require('jest-measure')

measure('An async task', async () => {

    const s = new Stopwatch()

    onLoad(() => {
        s.lap('loaded')

        loadFirstPage(() => {
            const p = s.subStopwatchFromLastLap()
            p.lap('first-page-loaded')
        })

        loadLastPage(() => {
            const p = s.subStopwatchFromLastLap()
            p.lap('last-page-loaded')
        })
    })

    await waitUnilLoaded()
    await waitUnilPagesLoaded()

    s.measure()
})
```

All of these sub-stopwatches will have their metrics
automatically measured for you when you call measure on the
main stopwatch.

# Reporter API

If you want to process reports to output them into other tools such as
in a comment in a Pull Request using DangerJS.

Then you can use Reporter API in your scripts to consume Jest Measure
reports.

```
const { ReportFormatter } = require('jest-measure')
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
        stats.mean.toFixed(2),
        stats.min.toFixed(2),
        stats.mean.toFixed(2),
        stats.error.toFixed(2),
        stats.difference.toFixed(2) * 100
    ];

    table.push(row)
})


formatter.formatReports()
console.log(table.toString());
```

The formatter will try to collect all reports under the current directory
and will call the callback for each metric to be formatted.

The example above formats the metrics into a table for the CLI.

# Options

To configure options for Jest Measure such as how many iterations
it will run a test for then simply add a `jestMeasure` section
to your `package.json` and add any of the avaliable [options](src/options.js)

```
{
  "name": "my-app",
  ...
  "jestBenchmark": {
      "benchmarkRounds": 50
  },
}
```