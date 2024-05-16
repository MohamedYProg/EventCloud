import React, { useState } from 'react';
import axios from 'axios';

function EventForm({ onCreateEvent }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventBookedPlaces, setEventBookedPlaces] = useState('');
  const [eventOwner, setEventOwner] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const eventData = {
        name: eventName,
        date: eventDate,
        capacity: eventCapacity,
        location: eventLocation,
        bookedPlaces: eventBookedPlaces,
        owner: eventOwner,
        category: eventCategory,
        image: eventImage,
        duration: eventDuration,
        description: eventDescription
        // Add more event fields as needed
      };
      const response = await axios.post('http://localhost:3000/api/v1/user/create_event', eventData);
        
        
        // Adjust the endpoint as per your backend
      setLoading(false);
      if (response.status === 201) {
        onCreateEvent(eventData);
        setEventName('');
        setEventDate('');
        setEventCapacity('');
        setEventLocation('');
        setEventOwner('');
        setEventCategory('');
        setEventImage('');
        setEventDuration('');
        setEventDescription('');

        alert('Event created successfully!');
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setLoading(false);
      alert('Failed to create event');
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
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
        <button type="submit" onClick={handleSubmit} disabled={loading}>Create Event</button>
      </form>
    </div>
  );
}


export default EventForm;
