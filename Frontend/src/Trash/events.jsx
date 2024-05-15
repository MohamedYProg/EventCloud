// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EventsPage.css'; // Import your CSS file

// const EventsPage = () => {
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         // Fetch events from your server when the component mounts
//         axios.get('/api/events')
//             .then(response => {
//                 setEvents(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching events:', error);
//             });
//     }, []);

//     return (
//         <div className="events-container">
//             <h1>Events</h1>
//             <div className="events-list">
//                 {events.map(event => (
//                     <div key={event._id} className="event-card">
//                         <h2>{event.title}</h2>
//                         <p>{event.description}</p>
//                         <p>Date: {event.date}</p>
//                         <p>Location: {event.location}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EventsPage;
