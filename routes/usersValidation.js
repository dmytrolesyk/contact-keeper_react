const { check } = require('express-validator');

const registerUserValidation = [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 }),
];

module.exports = registerUserValidation;
