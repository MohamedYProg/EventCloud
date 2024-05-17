import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      if (!name || !dob || !email || !password) {
        setError('All fields are required');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/v1/user/register',
        {
          name,
          dob,
          email,
          password
        }, {
        withCredentials: true // Include credentials in the request
      });

      setMessage(response.data.message);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Failed to sign up');
    }
  };

  return (
    <div>
      <header className="App-header">
        <nav className="Menu-bar">
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <div>
        <h2>Sign Up</h2>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <form onSubmit={handleSignUp}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;