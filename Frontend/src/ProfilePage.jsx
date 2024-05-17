import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');

  const fetchUserProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/v1/user/profile/${id}`);
      setUser(response.data.user);
    } catch (error) {
      setError('Error fetching user profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ProfilePage">
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
      <div className="Content">
        <h1>Profile Page</h1>
        <form onSubmit={fetchUserProfile}>
          <label>
            Enter ID:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </label>
          <button type="submit">Fetch Profile</button>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {user && (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            {/* Add other user details as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
