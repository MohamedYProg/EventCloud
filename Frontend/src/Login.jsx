import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EventsPage from './EventsPage';
import Signup from './Signup';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();



  const handleLogin = async () => {
    setMessage('');
    if (isLogin) {
      try {
        if (!email) {
          setMessage('Email is required');
          return;
        }
        const login = await axios.post(
          'http://localhost:3001/login',
          {
            email,
            password
          },
          { withCredentials: true }
        );
        if (login.status === 'success') {
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
      <header className="App-header">
        <nav className="Menu-bar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>

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
    </div>
  );
}

export default Login;