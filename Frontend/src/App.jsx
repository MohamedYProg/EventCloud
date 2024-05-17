import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
// import EventsPage from './EventsPage';
import Login from './Login';
import Signup from './Signup';
import AboutPage from './AboutPage';
import ContactUsPage from './ContactUsPage';

// Layout component
const Layout = ({ children }) => {
  return (
    <div className="App">
      <header>
        <h1 className="App-title">Eventify Booking Application</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactUsPage /></Layout>} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
