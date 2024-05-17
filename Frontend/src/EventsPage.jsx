import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { category } = useParams();

    const fetchFilteredEvents = useCallback(async () => {
        try {
            const response = await fetch(`/api/v1/events/category/${category}`);
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            const filteredData = data.filter((event) =>
                event.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setEvents(filteredData);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }, [category, searchQuery]); // Include category and searchQuery in the dependency array

    useEffect(() => {
        fetchFilteredEvents();
    }, [category, fetchFilteredEvents]); // Include fetchFilteredEvents in the dependency array

    const handleBookClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleConfirmBooking = async () => {
        try {
            const response = await fetch(`/api/v1/events/${selectedEvent.eventId}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ numberOfPlaces: 1 }),
            });
            if (!response.ok) {
                throw new Error('Failed to book event');
            }
            fetchFilteredEvents();
            setShowModal(false);
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    const handleCancelBooking = () => {
        setShowModal(false);
    };

    const handleEventsTabClick = () => {
        fetchFilteredEvents();
        setSearchQuery('');
    };

    return (
        <div className="EventsPage">
            <header className="App-header">
                <nav className="Menu-bar">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events" onClick={handleEventsTabClick}>Events</Link></li>
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
                {events.map((event, index) => (
                    <div className="Event" key={index}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <button onClick={() => handleBookClick(event)}>Book</button>
                        <button>View Info</button>
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
