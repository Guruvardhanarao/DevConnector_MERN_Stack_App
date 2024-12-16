const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validatePostInput = (data) => {
    const errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!validator.isLength(data.text, {min: 10, max:300})){
        errors.text = 'Text field must be in between 10 to 300 characters'
    }

    if(validator.isEmpty(data.text)){
        errors.text = 'Text field is required'
    }

    return {
        isValid: isEmpty(errors),
        errors
    };
}