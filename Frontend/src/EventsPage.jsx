import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventsPage() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event details
    const [numberOfPlaces, setNumberOfPlaces] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
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

    // Update handleBookClick function to prompt user for number of places
    const handleBookClick = (eventId) => {
        const numberOfPlaces = parseInt(prompt("Enter the number of places you want to book:", "1"));
        if (!isNaN(numberOfPlaces)) {
            setEventId(eventId); // Set the eventId state
            setNumberOfPlaces(numberOfPlaces);
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

    // const filteredEvents = events.filter(event =>
    //     event.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

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

    const handleUpdateEvent = async (id) => {
        navigate(`/events/update/${id}`); // Redirect to the UpdateEventForm component
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
                        <button onClick={() => handleViewInfo(event.id)}>View Info</button>
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                        <button onClick={() => handleUpdateEvent(event.id)}>Update Event</button>
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
            )}{showModal && (
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