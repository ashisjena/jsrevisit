console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.done = %j', a.done);
exports.done = true;
console.log('b done');

exports.bFunc = () => {
	console.log('B function');
	a.aFunc2();
};

exports.bFunc2 = () => {
	console.log('B function2');
};
