// const validator = require('validator');
import chalk, { Chalk } from 'chalk';
import validator from 'validator';

const valEmail = validator.isEmail('taufiqkba@gmail.com');
console.log(valEmail);

const phoneNumber = validator.isMobilePhone('081333233212', 'id-ID');
console.log(phoneNumber);

const numberic = validator.isNumeric('081333233212a');
console.log(numberic);

const message = chalk `lorem {bgBlue.white ipsum} larasum insfuadum antum adzun`;

console.log(message);