
console.log('main starting');
const c = require('./c.js');
const a = require('./a.js');
const b = require('./b.js');

c.cFunc();
a.aFunc();
b.bFunc();
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);