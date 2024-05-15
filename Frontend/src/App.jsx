import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import EventsPage from './EventsPage';

// Layout component
const Layout = ({ children }) => {
  return (
    <div className="App">
      <header>
        <h1 className="App-title">Event Booking Application</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <EventsPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
