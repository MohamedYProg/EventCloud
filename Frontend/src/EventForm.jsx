import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EventForm() {
    const { id } = useParams(); // Get the event ID from the URL
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [location, setLocation] = useState('');
    const [owner, setOwner] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchEventDetails(id);
        }
    }, [id]);

    const fetchEventDetails = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/event/${eventId}`);
            const eventData = response.data;

            setName(eventData.name);
            setDate(eventData.date);
            setCapacity(eventData.capacity);
            setLocation(eventData.location);
            setOwner(eventData.owner);
            setCategory(eventData.category);
            setImage(eventData.image);
            setDuration(eventData.duration);
            setDescription(eventData.description);
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const eventData = {
                name,
                date,
                capacity,
                location,
                owner,
                category,
                image,
                duration,
                description,
            };

            let response;
            if (id) {
                response = await axios.put(`http://localhost:3000/api/v1/event/${id}`, eventData);
            } else {
                response = await axios.post('http://localhost:3000/api/v1/user/create_event', eventData);
            }

            setMessage(response.data.message);
            navigate('/events');
        } catch (error) {
            console.error('Error creating/updating event:', error.response.data);
            setError('Failed to create/update event');
        }
    };

    return (
        <div>
            <h1>{id ? 'Update Event' : 'Create Event'}</h1>
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Capacity:
                    <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
                </label>
                <br />
                <label>
                    Location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </label>
                <br />
                <label>
                    Owner:
                    <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required />
                </label>
                <br />
                <label>
                    Category:
                    <input type="number" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </label>
                <br />
                <label>
                    Image:
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                </label>
                <br />
                <label>
                    Duration:
                    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <button type="submit" className="blue-button">{id ? 'Update Event' : 'Create Event'}</button>
            </form>
        </div>
    );
}    

export default EventForm;
