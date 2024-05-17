import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

function EventsPage() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]); // State to hold events
    const [eventId, setEventId] = useState(null);
    const [numberOfPlaces, setNumberOfPlaces] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        getAllEvents();
    }, []);

    // Function to book an event
    const bookEvent = async (eventId, numberOfPlaces) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/${eventId}/booking`, { numberOfPlaces });
            console.log('Event booked:', response.data);
            setResponseMessage(`Event booked successfully: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error('Error booking event:', error.response ? error.response.data : error.message);
            setResponseMessage(`Error booking event: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const getAllEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/events'); // Make GET request to fetch events
            setEvents(response.data); // Set events state with fetched data
        } catch (error) {
            console.error('Error fetching events:', error);
            // Handle error
        }
    };

    // Update handleBookClick function to prompt user for number of places
    const handleBookClick = (eventId) => {
        const numberOfPlaces = parseInt(prompt("Enter the number of places you want to book:", "1"));
        if (!isNaN(numberOfPlaces)) {
            setEventId(eventId); // Set the eventId state
            setNumberOfPlaces(numberOfPlaces);
            setShowModal(true);
        }
    };

    // Update handleConfirmBooking function to send number of places to backend
    const handleConfirmBooking = async () => {
        try {
            await bookEvent(eventId, numberOfPlaces);
            setShowModal(false);
            alert("Event booked successfully!");
        } catch (error) {
            console.error('Error booking event:', error);
            // Handle error
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
                        <button>View Info</button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to book {numberOfPlaces} places for this event?</h2>
                        <button onClick={handleConfirmBooking}>Yes</button>
                        <button onClick={handleCancelBooking}>No</button>
                    </div>
                </div>
            )}
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}

export default EventsPage;