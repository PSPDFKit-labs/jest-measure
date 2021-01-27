# Jest Measure

The Jest Measure library implements APIs for writing benchmaks to profile and
verify the performance of your code.

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

After this we can now run our benchmarks to check if they performance
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

# Performance API Usage

# Measurement Objects

# Reporter API