const test = require('test')
const assert = require('node:assert')

// Running tests can also be done using describe to declare a suite and it to declare a test

test.describe('A thing', () => {
  test.it('should work', () => {
    assert.strictEqual(1, 1);
  });

  test.it('should be ok', () => {
    assert.strictEqual(2, 2);
  });

  test.describe('a nested thing', () => {
    test.it('should work', () => {
      assert.strictEqual(3, 3);
    });
  });
});