console.log('c starting');
const a = require('./a.js');
const b = require('./b.js');

exports.cFunc = () => {
	a.aFunc();
  b.bFunc();
  a.aFunc2();
  b.bFunc2();
};
