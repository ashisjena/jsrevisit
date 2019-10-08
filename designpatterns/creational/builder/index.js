const PersonBuilder = require('./PersonBuilder');

// Employees
const sue = new PersonBuilder('Sue').makeEmployee().makeManager(60).build();
const bill = new PersonBuilder('Bill').makeEmployee().makePartTime().build();
const phill = new PersonBuilder('Phill').makeEmployee().build();

// Shoppers
const charles = new PersonBuilder('Charles').withMoney(500).withList(['jenas', 'sunglasses']).build();
const tabbitha = new PersonBuilder('Tabbitha').withMoney(100).build();

console.log(sue.toString());
console.log(charles.toString());