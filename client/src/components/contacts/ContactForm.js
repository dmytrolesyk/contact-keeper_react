import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const {
    addContact,
    current,
    clearCurrentContact,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = ({ target: { name, value } }) => setContact({
    ...contact,
    [name]: value,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const clearAll = () => {
    clearCurrentContact();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      /> Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      /> Professional
      <input
        type="submit"
        value={current ? 'Update Contact' : 'Add Contact'}
        className="btn btn-primary btn-block"
      />
      {current && (<button
        className="btn btn-light btn-block"
        onClick={clearAll}
      >
          Clear
        </button>)}
    </form>
  );
};

export default ContactForm;
