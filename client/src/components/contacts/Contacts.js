import React, { useContext, useEffect } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  useEffect(() => {
    contactContext.getContacts();
  }, [])
  const { contacts, filtered, loading } = contactContext;

  if (contacts && !contacts.length && !loading) {
    return <h4>Please add a contact</h4>
  } 
  const items = filtered ? filtered : contacts;

  return (
    <>
    {contacts && !loading 
    ? (
      <TransitionGroup>
      {items.map(
        contact => (
        <CSSTransition
          key={contact._id}
          timeout={500}
          classNames="item"
        >
          <ContactItem contact={contact} />
        </CSSTransition>
      ))}
     </TransitionGroup>
    )
    : (<Spinner />)
  }
    </>
  );
};

export default Contacts;
