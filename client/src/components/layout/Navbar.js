import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import СontactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  const {
    isAuthenticated,
    logout,
    user,
  } = useContext(AuthContext);
  const { clearContacts } = useContext(СontactContext);

  const onLogout = () => {
    logout();
    clearContacts();
  }

  const authLinks = (
    <>
    <li>Hello {user && user.name}</li>
    <li>
      <a
        onClick={onLogout} 
        href="#!">
        <span className="fas fa-sign-out-alt"></span>
        <span className="hide-sm">Logout</span>
      </a>
    </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <span className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
