const test = require('node:test');
const assert = require('node:assert')


test.test('synchronous passing test', (t) => {
  assert.strictEqual(1, 1,)
}).then( r =>{console.log("Test Completed")});

/**
 * Tests created via the test module consist of a single function that is processed in one of three ways:

A synchronous function that is considered failing if it throws an exception, and is considered passing otherwise.
A function that returns a Promise that is considered failing if the Promise rejects, and is considered passingif the Promise resolves.
A function that receives a callback function. If the callback receives any truthy value as its first argument,
 the test is considered failing. If a falsy value is passed as the first argument to the callback,
 the test is considered passing. If the test function receives a callback function and also returns a Promise, the test will fail.
 */