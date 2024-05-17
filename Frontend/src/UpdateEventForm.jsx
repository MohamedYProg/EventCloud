import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEventForm() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventCapacity, setEventCapacity] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventOwner, setEventOwner] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventImage, setEventImage] = useState(''); // String to hold the image URL
    const [eventDuration, setEventDuration] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventBookedPlaces, setEventBookedPlaces] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the event ID from the URL parameters

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/events/ids/${id}`);
            const event = response.data;
            setEventName(event.name);
            setEventDate(event.date);
            setEventCapacity(event.capacity);
            setEventLocation(event.location);
            setEventOwner(event.owner);
            setEventCategory(event.category);
            setEventImage(event.image); // Set image URL
            setEventDuration(event.duration);
            setEventDescription(event.description);
            setEventBookedPlaces(event.bookedPlaces);
        } catch (error) {
            console.error('Error fetching event:', error);
            setError('Failed to fetch event details');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const eventData = {
                id,
                name: eventName,
                date: eventDate,
                Capacity: eventCapacity,
                Location: eventLocation,
                BookedPlaces: eventBookedPlaces,
                Owner: eventOwner,
                Category: eventCategory,
                Image: eventImage, // Include image URL
                Duration: eventDuration,
                Description: eventDescription,
            };

            const response = await axios.put(
                `http://localhost:3000/api/v1/user/update_event/${id}`,
                eventData,
                { withCredentials: true }
            );

            setMessage(response.data.message);
            navigate('/events');
        } catch (error) {
            console.error('Error updating event:', error.response?.data);
            setError('Failed to update event');
        }
    };

    return (
        <div>
            <h1>Update Event</h1>
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Capacity:
                    <input type="number" value={eventCapacity} onChange={(e) => setEventCapacity(e.target.value)} required />
                </label>
                <br />
                <label>
                    Location:
                    <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
                </label>
                <br />
                <label>
                    Booked Places:
                    <input type="number" value={eventBookedPlaces} onChange={(e) => setEventBookedPlaces(e.target.value)} />
                </label>
                <br />
                <label>
                    Owner:
                    <input type="text" value={eventOwner} onChange={(e) => setEventOwner(e.target.value)} />
                </label>
                <br />
                <label>
                    Category:
                    <input type="text" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} />
                </label>
                <br />
                <label>
                    Duration:
                    <input type="text" value={eventDuration} onChange={(e) => setEventDuration(e.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                </label>
                <br />
                <label>
                    Image URL:
                    <input type="text" value={eventImage} onChange={(e) => setEventImage(e.target.value)} required />
                </label>
                <br />
                <button type="submit" className="blue-button">Update Event</button>
            </form>
            <button onClick={() => navigate('/events')} className="red-button">Cancel</button>
        </div>
    );
}

export default UpdateEventForm;
