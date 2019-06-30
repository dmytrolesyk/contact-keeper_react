const { check, param } = require('express-validator');

exports.addContactValidation = [
  check('name', 'Name is required').not().isEmpty(),
];

exports.updateAndDeleteContactValidation = [
  param('id').custom(async (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Invalid id format');
    }
  })
];
