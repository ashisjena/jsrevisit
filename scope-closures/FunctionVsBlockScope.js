try {
  undefined();
} catch (err) {
  console.log(`This is catch Block! The err is only valid to this catch block`);
  console.log(err); // In catch block the `err` is block scope. Can't be referenced else where.
}

// console.log(err); // Reference Error: 'err' not defined
