const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const {
  addContactValidation,
  updateAndDeleteContactValidation,
} = require('./contactsValidation');
const { validationResult } = require('express-validator');
const catchServerErrors = require('../helpers/catchServerErrors');
const auth = require('../middleware/auth');

const getUserContacts = async (req, res) => {
  const { id } = req.user;
  const contacts = await Contact.find({ user: id }).sort({ date: -1 });
  res.status(200).json({
    message: 'Contacts received successfully',
    data: contacts,
  });
};

const addContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;
  const { id } = req.user;
  const newContact = new Contact({
    name,
    email,
    phone,
    type,
    user: id,
  });

  const contact = await newContact.save();
  res.status(200).json({
    message: 'Contact created successfully',
    data: contact,
  })
};

const updateContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id: contactId } = req.params;
  const { id: userId } = req.user;
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  let contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Contect does not exist' });
  }
  if (contact.user.toString() !== userId) {
    return res.status(401).json({ message: 'You are not the contact owner' });
  }

  contact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: contactFields },
    { new: true },
  );

  res.status(200).json({
    message: 'Contact updated successfully',
    data: contact,
  });
};

const deleteContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: contactId } = req.params;
  const { id: userId } = req.user;

  let contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Contect does not exist' });
  }
  if (contact.user.toString() !== userId) {
    return res.status(401).json({ message: 'You are not the contact owner' });
  }

  await Contact.findByIdAndRemove(contactId);

  res.status(200).json({ message: 'Contact successfully deleted' });
};

router.get(
  '/',
  auth,
  catchServerErrors(getUserContacts)
);

router.post(
  '/',
  auth,
  addContactValidation,
  catchServerErrors(addContact)
);

router.put(
  '/:id',
  auth,
  updateAndDeleteContactValidation,
  catchServerErrors(updateContact)
);

router.delete(
  '/:id',
  auth,
  updateAndDeleteContactValidation,
  catchServerErrors(deleteContact)
);

module.exports = router;
