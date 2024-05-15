// src/components/AddEventForm.jsx
import React, { useState } from "react";

function AddEventForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'll implement the logic to send the event data to your backend
    console.log("Adding event with data:", formData);
    // Example: addEvent(formData)
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEventForm;
