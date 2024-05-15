// pages/HomePage.js
import React from "react";
import Header from "../components/Header"; // Assuming you have a Header component
import Footer from "../components/Footer"; // Assuming you have a Footer component
import EventFeed from "../components/EventFeed"; // Import the EventFeed component

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <EventFeed />
            <Footer />
        </div>
    );
}

export default HomePage;
