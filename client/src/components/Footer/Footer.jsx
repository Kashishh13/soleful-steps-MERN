import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css';
import logo from '../../images/Screenshot 2024-09-28 204901.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img className='logo' src={logo}/>
          <p>Your go-to destination for stylish and comfortable footwear.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@solefulsteps.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul className='ql'>
            <li><a href="#">About Us</a></li>
            <li><a href="/myorders">My Orders</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Soleful Steps. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
