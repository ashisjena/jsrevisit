const moment = require('moment-timezone');

const date = new Date();

// date.setDate(date.getDate() - 1);

console.log(date.getDay());

date.setDate(date.getDate() - (date.getDay() - 5));

const pst = moment(date).tz('America/Mexico_City');


console.log(pst.format());

