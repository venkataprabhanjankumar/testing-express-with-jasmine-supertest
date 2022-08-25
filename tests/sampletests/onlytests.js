const test = require('test')
const assert = require('node:assert')

/**
 * If Node.js is started with the --test-only command-line option,
 * it is possible to skip all top level tests except for a selected subset by passing the only option to
 * the tests that should be run. When a test with the only option set is run,
 * all subtests are also run. The test context's runOnly() method can be used to implement the same behavior at the subtest level.
 */

test.test('this test will run',{only: true},async (t)=>{
    // Within this test, all subtests are run by default.
  await t.test('running subtest',(t)=>{
      assert.strictEqual(1,1)
  });

  // The test context can be updated to run subtests with the 'only' option.
  t.runOnly(true);
  await t.test('this subtest is now skipped',(t)=>{
    assert.strictEqual(1,1)
  });
  await t.test('this subtest is run', { only: true });

  // Switch the context back to execute all tests.
  t.runOnly(false);
  await t.test('this subtest is now run');

  // Explicitly do not run these tests.
  await t.test('skipped subtest 3', { only: false });
  await t.test('skipped subtest 4', { skip: true });
})