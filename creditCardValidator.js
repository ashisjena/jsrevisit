const validator = require('card-validator');

let numberValidation = validator.number('378734493671000', {maxLength: 16});

console.log(numberValidation)
console.log(numberValidation.isValid);