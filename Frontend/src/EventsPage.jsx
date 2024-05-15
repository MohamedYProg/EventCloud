import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EventsPage() {
    const [showModal, setShowModal] = useState(false);

    const handleBookClick = () => {
        setShowModal(true);
    };

    const handleConfirmBooking = () => {
        // Add logic to handle booking the event
        setShowModal(false);
    };

    const handleCancelBooking = () => {
        setShowModal(false);
    };

    return (
        <div className="EventsPage">
            <header className="App-header">
                <nav className="Menu-bar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="Content">
                <h1>Events</h1>
                <div className="Event">
                    <h2>Event 1</h2>
                    <p>Event 1 Description...</p>
                    <button onClick={handleBookClick}>Book</button>
                    <button>View Info</button>
                </div>
                <div className="Event">
                    <h2>Event 2</h2>
                    <p>Event 2 Description...</p>
                    <button onClick={handleBookClick}>Book</button>
                    <button>View Info</button>
                </div>
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
