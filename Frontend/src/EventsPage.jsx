import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

function EventsPage() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]); // State to hold events
    const [selectedEvent, setSelectedEvent] = useState({});

    useEffect(() => {
        // Fetch events when the component mounts
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/events'); // Make GET request to fetch events
            setEvents(response.data); // Set events state with fetched data
        } catch (error) {
            console.error('Error fetching events:', error);
            // Handle error
        }
    };

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

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteEvent = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/user/delete_event/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete event');
            }
            // Refresh events after deleting
            getAllEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="EventsPage">
            <header className="App-header">
                <nav className="Menu-bar">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="Content">
                <h1>Events</h1>
                <Link to="/events/create" className="blue-button">Create Event</Link>
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {events.map((event) => (
                    <div className="Event" key={event.id}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <button onClick={() => handleBookClick(event)}>Book</button>
                        <button>View Info</button>
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to book {selectedEvent.name}?</h2>
                        <button onClick={handleConfirmBooking}>Yes</button>
                        <button onClick={handleCancelBooking}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventsPage;
