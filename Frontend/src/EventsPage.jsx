import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

function EventsPage() {
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
            console.error('Error booking event:', error.response ? error.response.data : error.message);
            setResponseMessage(`Error booking event: ${error.response ? error.response.data.message : error.message}`);
        }
    }, [category, searchQuery]); // Include category and searchQuery in the dependency array

    useEffect(() => {
        fetchFilteredEvents();
    }, [category, fetchFilteredEvents]); // Include fetchFilteredEvents in the dependency array


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
            alert("Event booked successfully!");
        } catch (error) {
            console.error('Error booking event:', error);
            // Handle error
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