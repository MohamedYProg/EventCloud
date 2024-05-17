import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import axios from 'axios';
=======
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making HTTP requests
>>>>>>> 4ef54154ddc7ee30b1cee8bd4b54f9402dfdc1cc

function EventsPage() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
<<<<<<< HEAD
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event details
=======
    const [events, setEvents] = useState([]); // State to hold events
    const [selectedEvent, setSelectedEvent] = useState({});
    const navigate = useNavigate(); // Initialize navigate hook
>>>>>>> 4ef54154ddc7ee30b1cee8bd4b54f9402dfdc1cc

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        try {
<<<<<<< HEAD
            const response = await axios.get('http://localhost:3000/api/v1/events');
            setEvents(response.data);
=======
            const response = await axios.get('http://localhost:3000/api/v1/events'); // Make GET request to fetch events
            setEvents(response.data); // Set events state with fetched data
            return response.data;
>>>>>>> 4ef54154ddc7ee30b1cee8bd4b54f9402dfdc1cc
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
    };//http://localhost:3000/api/v1/f3e3b796-411f-4d18-a5ff-091b6bedfa34

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

    // Inside the EventsPage component
    const handleUpdateEvent = async (id) => {
        navigate(`/events/update/${id}`); // Redirect to the UpdateEventForm component
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
<<<<<<< HEAD
                        <button onClick={() => handleBookClick(event.id)}>Book</button>
                        <button onClick={() => handleViewInfo(event.id)}>View Info</button>
=======
                        <button onClick={() => handleBookClick(event)}>Book</button>
                        <button>View Info</button>
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                        <button onClick={() => handleUpdateEvent(event.id)}>Update Event</button>
>>>>>>> 4ef54154ddc7ee30b1cee8bd4b54f9402dfdc1cc
                    </div >
                ))
}
            </div >
    { showModal && selectedEvent && (
        <div className="modal">
            <div className="modal-content">
<<<<<<< HEAD
                        <h2>Event Details</h2>
                        <p>Name: {selectedEvent.name}</p>
                        <p>Description: {selectedEvent.Description}</p>
                        <p>Location: {selectedEvent.Location}</p>
                        <p>Capacity: {selectedEvent.Capacity}</p>
                        <p>Booked Places: {selectedEvent.BookedPlaces}</p>
                        <p>Owner: {selectedEvent.Owner}</p>
                        <p>Category: {selectedEvent.Category}</p>
                        <p>Duration: {selectedEvent.Duration}</p>
{/* <img src={selectedEvent.image} alt={selectedEvent.name} /> */ }

<button onClick={handleCancelBooking}>Close</button>
=======
                        <h2>Are you sure you want to book {selectedEvent.name}?</h2>
                        <button onClick={handleConfirmBooking}>Yes</button>
                        <button onClick={handleCancelBooking}>No</button>
>>>>>>> 4ef54154ddc7ee30b1cee8bd4b54f9402dfdc1cc
                    </div >
                </div >
            )}
        </div >
    );
}

export default EventsPage;
