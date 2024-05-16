import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EventForm() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventOwner, setEventOwner] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventBookedPlaces, setEventBookedPlaces] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const eventData = {
        name: eventName,
        date: eventDate,
        Capacity: eventCapacity,
        Location: eventLocation,
        BookedPlaces: eventBookedPlaces,
        Owner: eventOwner,
        Category: eventCategory,
        Image: eventImage,
        Duration: eventDuration,
        Description: eventDescription,
      };

      const response = await axios.post(
        'http://localhost:3000/api/v1/user/create_event',
        eventData,
        { withCredentials: true }
      );

      setMessage(response.data.message);
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error.response.data); // Log response data
      setError('Failed to create event');
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
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
          <input type="number" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} />
        </label>
        <br />
        <label>
          Duration:
          <input type="number" value={eventDuration} onChange={(e) => setEventDuration(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Image:
          <input type="text" value={eventImage} onChange={(e) => setEventImage(e.target.value)} />
        </label>
        <br />
        <button type="submit" className="blue-button" onClick={handleSubmit}>Create Event</button>
      </form>
    </div>
  );
}


export default EventForm;
