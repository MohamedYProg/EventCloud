import React, { useState, useEffect } from "react";
import "./main-page.css"; // Import CSS file for styling

function EventFeed() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events when the component mounts
    getEventsByCategory("all");
  }, []);

  // Function to fetch events by category
  const getEventsByCategory = async (category) => {
    try {
      const response = await fetch(`/api/v1/events/category/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events by category");
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching events by category:", error.message);
      setError("Failed to fetch events by category");
    }
  };

  return (
    <div className="event-feed">
      {error && <p className="error">{error}</p>}
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event">
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.Location}</p>
            {/* Add more event details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventFeed;
