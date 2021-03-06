import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const {
    _id,
    name,
    email,
    phone,
    type,
  } = contact;

  const onDelete = () => {
    contactContext.deleteContact(_id);
    contactContext.clearCurrentContact();
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
          style={{ float: 'right' }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (<li>
          <span className="fas fa-envelope-open"></span> {email}
        </li>)}
        {phone && (<li>
          <span className="fas fa-phone"></span> {phone}
        </li>)}
      </ul>
      <div>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => contactContext.setCurrentContact(contact)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
