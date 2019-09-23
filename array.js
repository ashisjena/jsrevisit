const names = ['Ram', 'Shyam', 'Sita'];

for (let name of names) {
  console.log(name);
}

for (let index in names) {
  console.log(names[index]);
}

console.log(names.map(el => 'Name: ' + el)); // Returns a new Array without mutating the old array.
console.log(names.filter(el => el === 'Ram'));
console.log(names.reduce((accumulator, el) => accumulator + ' ' + el, 'Initial_Value'));

console.log([...names]); // spread operator

const toArray = (...args) => args; // Rest operator used to merge different elements to an array.
console.log(toArray('Ram', 'Sita', 'Ravan'));
