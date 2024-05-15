// src/components/EventsList.jsx
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Here you'll fetch events from your backend
    // Example: fetchEvents()
    // Update state with fetched events
    setEvents([
      { id: 1, name: "Event 1", date: "2024-05-20", location: "Location 1" },
      { id: 2, name: "Event 2", date: "2024-05-25", location: "Location 2" },
      { id: 3, name: "Event 3", date: "2024-05-30", location: "Location 3" },
    ]);
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventsList;
