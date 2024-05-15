// import React, { useState, useEffect } from "react";
// import "./main-page.css"; // Import CSS file for styling

// function EventFeed() {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("all"); // State to track the active tab

//   useEffect(() => {
//     // Fetch events when the component mounts
//     getEventsByCategory(activeTab);
//   }, [activeTab]); // Update events when the active tab changes

//   // Function to fetch events by category
//   const getEventsByCategory = async (category) => {
//     try {
//       const response = await fetch(`/api/v1/events/category/${category}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch events by category");
//       }
//       const data = await response.json();
//       setEvents(data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching events by category:", error.message);
//       setError("Failed to fetch events by category");
//     }
//   };

//   return (
//     <div className="event-feed">
//       {error && <p className="error">{error}</p>}
//       {/* Navigation bar with tabs */}
//       <div className="tabs-menu">
//         <button
//           className={activeTab === "Events" ? "active" : ""}
//           onClick={() => setActiveTab("Events")}
//         >
//           Events
//         </button>
//       </div>
//       <div className="event-list">
//         {events.map((event) => (
//           <div key={event.id} className="event">
//             <h3>{event.name}</h3>
//             <p>Date: {event.date}</p>
//             <p>Location: {event.Location}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default EventFeed;
