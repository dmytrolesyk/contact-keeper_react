const { check } = require('express-validator');

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
];

module.exports = loginValidation;
