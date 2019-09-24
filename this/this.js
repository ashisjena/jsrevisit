global.name = 'ram';

this.name = 'sita';

let person = {
  name: 'Ashis',
  age: 29,
  greet: function() {
    console.log(this.name);
  },
  greet1() {
    console.log(this.name);
  },
  greet2: () => {
    console.log(this.name); // "this" refers here to the global scope/global node runtime scope and not this person object scope.
    console.log(this); // For arrow function "this" refers to the lexically defined enclosing function scope.
  }
};

person.greet();
person.greet1();
person.greet2();

console.log(this);

