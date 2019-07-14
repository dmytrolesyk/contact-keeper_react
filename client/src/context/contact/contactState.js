import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_CONTACTS,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get('api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'api/contacts',
        contact,
        config
      );
      dispatch({ type: ADD_CONTACT, payload: res.data.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`api/contacts/${contactId}`);
      dispatch({ type: DELETE_CONTACT, payload: contactId })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  const updateContact = async (contact) => {
    console.log(contact)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  }
  
  const setCurrentContact = contact => dispatch({ type: SET_CURRENT, payload: contact });
  
  const clearCurrentContact = () => dispatch({ type: CLEAR_CURRENT });

  const filterContacts = text => dispatch({ type: FILTER_CONTACTS, payload: text });
    
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return <ContactContext.Provider
    value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      getContacts,
      addContact,
      deleteContact,
      setCurrentContact,
      clearCurrentContact,
      clearContacts,
      updateContact,
      filterContacts,
      clearFilter,
    }}
  >
    {props.children}
  </ContactContext.Provider>
};

export default ContactState;
