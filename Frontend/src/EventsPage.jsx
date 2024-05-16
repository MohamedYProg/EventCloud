import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function EventsPage() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const events = [
        { name: 'Event 1', description: 'Event 1 Description...' },
        { name: 'Event 2', description: 'Event 2 Description...' }
    ];

    const handleBookClick = () => {
        setShowModal(true);
    };

    const handleConfirmBooking = () => {
        setShowModal(false);
    };

    const handleCancelBooking = () => {
        setShowModal(false);
    };

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <h1>Events</h1>
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {filteredEvents.map((event, index) => (
                    <div className="Event" key={index}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <button onClick={handleBookClick}>Book</button>
                        <button>View Info</button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to book this event?</h2>
                        <button onClick={handleConfirmBooking}>Yes</button>
                        <button onClick={handleCancelBooking}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventsPage;
