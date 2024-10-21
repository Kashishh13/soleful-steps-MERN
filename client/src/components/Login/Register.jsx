import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Registration successful!');
      setTimeout(() => {
        navigate('/');
      }, 1500); // Redirect to login page after 1.5 seconds
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className='whole'>
    <div className='popup'>
      <form onSubmit={handleRegister}>
        <h2 className='head'>Register</h2>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
        <p>Already have an account <Link to='/'>Sign In</Link></p>
      </form>
    </div>
    </div>
  );
};

export default Register;
