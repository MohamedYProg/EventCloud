import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventsPage() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event details

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleBookClick = (eventId) => {
        const numberOfPlaces = parseInt(prompt("Enter the number of places you want to book:", "1"));
        if (!isNaN(numberOfPlaces)) {
            setSelectedEvent(events.find(event => event.id === eventId)); // Find the selected event
            setShowModal(true);
        }
    };

    const handleViewInfo = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/${eventId}`);
            setSelectedEvent(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
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
                {filteredEvents.map((event, index) => (
                    <div className="Event" key={index}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <button onClick={() => handleBookClick(event.id)}>Book</button>
                        <button onClick={() => handleViewInfo(event.id)}>View Info</button>
                    </div>
                ))}
            </div>
            {showModal && selectedEvent && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Event Details</h2>
                        <p>Name: {selectedEvent.name}</p>
                        <p>Booked Places: {selectedEvent.BookedPlaces}</p>
                        <p>Date: {selectedEvent.date}</p>
                        <p>Duration: {selectedEvent.Duration}</p>
                        <p>Owner: {selectedEvent.Owner}</p>
                        <p>Description: {selectedEvent.Description}</p>
                        <p>Capacity: {selectedEvent.Capacity}</p>
                        <p>Location: {selectedEvent.Location}</p>
                        <p>Category: {selectedEvent.Category}</p>
                        <button onClick={handleCancelBooking}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
// "BookedPlaces": 24,
// "date": "2024-05-20",
// "Duration": "2 hours",
// "Image": "https://example.com/image.jpg",
// "Owner": "Sample Owner",
// "Capacity": 100,
// "Location": "Sample Location",
// "Description": "This is a sample event description.",
// "id": "f3e3b796-411f-4d18-a5ff-091b6bedfa34",
// "name": "Jana's event",
// "Category": "Sample Category"
export default EventsPage;
