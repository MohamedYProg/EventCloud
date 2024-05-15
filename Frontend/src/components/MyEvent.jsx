// src/components/MyEvents.jsx
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";

function MyEvents() {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    // Here you'll fetch user's events from your backend
    // Example: fetchUserEvents()
    // Update state with fetched user events
    setUserEvents([
      {
        id: 4,
        name: "My Event 1",
        date: "2024-06-01",
        location: "My Location 1",
      },
      {
        id: 5,
        name: "My Event 2",
        date: "2024-06-05",
        location: "My Location 2",
      },
    ]);
  }, []);

  return (
    <div>
      <h2>My Events</h2>
      {userEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default MyEvents;
