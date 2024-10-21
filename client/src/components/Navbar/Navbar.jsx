import React from 'react';
import './Navbar.css';
 import { IoBagCheck } from "react-icons/io5";

import logo from '../../images/Screenshot 2024-09-28 204901.png'
import {FaSignOutAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom';
const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
    <div className="navbar-left">
    <Link to='/home'><img src={logo} className='logo'/></Link>
    </div>
    <div className="navbar-right">
    <h3><Link to='/cart' className='link'><IoBagCheck className='cart-icon'/></Link></h3>
     <h3><Link to='/myorders' className='link'>My Orders</Link></h3>
     
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="logout-icon" /> Logout
      </button>
    </div>
  </nav>
);
};

export default Navbar;