const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    if(!validator.isLength(data.name, {min:3, max:20})){
        errors.name = 'Name must be between 2 and 20 characters.'
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email is required.';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Not a valid email, please check.'
    }
    if(validator.isEmpty(data.password)){
        errors.email = 'Password is required.'
    }
    if(!validator.equals(data.password, data.password2)){
        errors.password = 'Passwords do not match. Please try again.'
    }
    if(!validator.isLength(data.password, {min:6, max:20})){
        errors.password = 'Password must be between 6 and 20 characters.'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}