const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../models/User');
const registerUserValidation = require('./usersValidation');
const { validationResult } = require('express-validator');
const catchServerErrors = require('../helpers/catchServerErrors');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  user = new User({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const payload = {
    user: {
      id: user._id,
    }
  };
  const token = jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 360000 },
  );

  res.status(200).json({
    message: 'User successfully registered',
    data: token,
  });

};

router.post('/', registerUserValidation, catchServerErrors(registerUser));

module.exports = router;
