import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setMessage('');
    if (isLogin) {
      try {
        if (!email) {
          setMessage('Email is required');
          return;
        }
        const login= await axios.post(
          'http://localhost:3000/api/v1/login',
          {
            email,
            password
          },
          { withCredentials: true }
        );
        if (login.status === 'success'){
          navigate('/MainPage'); // change this
        }
      }
      catch (e) {
        console.error(e);
        setMessage('Failed to login');
        return;
      }
    }
  }
  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;