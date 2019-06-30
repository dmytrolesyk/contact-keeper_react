const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../models/User');
const loginValidation = require('./authValidation');
const { validationResult } = require('express-validator');
const catchServerErrors = require('../helpers/catchServerErrors');
const auth = require('../middleware/auth');

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
   return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

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
    message: 'User successfully logged in',
    data: token,
  });

};

const getLoggedInUser = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  const user = await User.findById(id).select('-password');
  res.status(200).json({
    message: 'User received successfully',
    data: user,
  });
};

router.post('/', loginValidation, catchServerErrors(login));
router.get('/', auth, getLoggedInUser);

module.exports = router;
