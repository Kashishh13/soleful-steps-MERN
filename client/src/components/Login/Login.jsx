

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { StoreContext } from '../../Context/StoreContext';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setToken, setUserID } = useContext(StoreContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Login successful!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userID', data.userID);
      setToken(data.token);
      setUserID(data.userID);
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className='whole'>
      <div className='popup'>
        <form onSubmit={handleLogin}>
          <h2 className='head'>Login</h2>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
          <p>
            Do not have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
