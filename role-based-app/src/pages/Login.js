// src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../utils';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, {
        withCredentials: true
      });
 // Save token & role
      if ((await getUser()).role === 'admin') navigate('/admin-dashboard');
      else navigate('/user-dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={() => navigate('/signup')}>Dont have an Account? SIGNUP!</button>
      </div>
    </div>
  );

}

export default Login;
