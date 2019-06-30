import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => (
  <div className="navbar bg-primary">
    <h1>
      <span className={icon} /> {title}
    </h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </div>
);

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
