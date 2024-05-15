import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from './HomePage';

function EventsPage() {
    return (
        <div className="EventsPage">
            <header className="App-header">
                <nav className="Menu-bar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="Content">
                <h1>Events</h1>
                <div className="Event">
                    <h2>Event 1</h2>
                    <p>Event 1 Description...</p>
                    <button>Book</button>
                    <button>View Info</button>
                </div>
                <div className="Event">
                    <h2>Event 2</h2>
                    <p>Event 2 Description...</p>
                    <button>Book</button>
                    <button>View Info</button>
                </div>
                {/* Add more events as needed */}
            </div>
        </div>
    );
}

export default EventsPage;
