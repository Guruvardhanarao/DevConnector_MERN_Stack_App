const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateProfileExperienceInput = (data) => {
    const errors = {};

    data.titile = !isEmpty(data.titile) ? data.titile : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(validator.isEmpty(data.titile)){
        errors.titile = 'Job titile field is required';
    }

    if(validator.isEmpty(data.company)){
        errors.company = 'Company field is required';
    }

    if(validator.isEmpty(data.from)){
        errors.from = 'From field is required';
    }

    return {
        isValid: isEmpty(errors),
        errors
    };
}