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
    setMessage("");
    try {
      if (!email || !password) {
        setMessage("Email and password are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
      } else {
        setMessage("Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Failed to login");
    }
  };

  return (
    <div>
      <header className="App-header">
        <nav className="Menu-bar">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <h2>Login</h2>
        {message && <div>{message}</div>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;