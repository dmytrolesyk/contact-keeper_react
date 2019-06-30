import React, { useContext, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const text = useRef('');

  const onChange = ({ target: { value } }) => {
    if (text.current.value) {
      contactContext.filterContacts(value);
    } else {
      contactContext.clearFilter();
    }
  }

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts"
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
