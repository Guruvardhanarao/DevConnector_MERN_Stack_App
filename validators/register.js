const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    if(!validator.isLength(data.name, {min:3, max:20})){
        errors.name = 'Name must be between 2 and 20 characters.'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}