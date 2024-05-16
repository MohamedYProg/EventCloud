import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="EventsPage">
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
                <h1>Welcome to the Home Page!</h1>
            </div>
        </div>
    );
}

export default HomePage;
