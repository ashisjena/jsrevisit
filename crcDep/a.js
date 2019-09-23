console.log('a starting');
let done = false;
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
done = true;
console.log('a done');

const aFunc = () => {
	console.log('Function A');
	b.bFunc2();
};

const aFunc2 = () => {
	console.log('Function A 2');
};

module.exports = {
  aFunc, aFunc2, done
}

