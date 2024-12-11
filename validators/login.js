const validator =require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = (data) => {
    let errors = {};

    if(validator.isEmpty(data.email)){
        errors.email = 'Email is required';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Not a valid email, please check.'
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password is required.';
    }

    return {errors, isValid: isEmpty(errors)}
}