const test = require('test')
const assert = require('node:assert')

test('top level test 1',async (t)=>{
    await t.test('f1',(t)=>{
        assert.strictEqual(1,1)
    });
    await t.test('f2',(t)=>{
        assert.strictEqual(2,2)
    })
})

//skipping test cases

// The skip option is used, but no message is provided.
test('skip option', { skip: true }, (t) => {
  // This code is never executed.
});

// The skip option is used, and a message is provided.
test('skip option with message', { skip: 'this is skipped' }, (t) => {
  // This code is never executed.
});

test('skip() method', (t) => {
  // Make sure to return here as well if the test contains additional logic.
  t.skip();
});

test('skip() method with message', (t) => {
  // Make sure to return here as well if the test contains additional logic.
  t.skip('this is skipped');
});