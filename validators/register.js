const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRegisterInput = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters.";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Not a valid email, please check.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be between 6 and 20 characters.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match. Please try again.";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
