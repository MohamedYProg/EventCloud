import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
    return (
        <div className="EventsPage">
            <header className="App-header">
                <nav className="Menu-bar">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="about-page">
                <h1>Welcome to Eventify</h1>
                <p>
                    At Eventify, we understand the importance of creating unforgettable experiences. Whether you're planning a corporate conference, a dazzling wedding, a community fundraiser, or an intimate gathering among friends, we're here to make the process seamless and stress-free.
                </p>

                <h2>Our Mission</h2>
                <p>
                    Our mission is simple: to connect people with their perfect event, effortlessly. We believe that every event should be a reflection of its host's vision and personality. That's why we've curated a diverse range of venues and services, ensuring that there's something for everyone.
                </p>

                <h2>Why Choose Eventify?</h2>
                <ul>
                    <li><strong>Unparalleled Variety:</strong> From elegant ballrooms to rustic barns, we offer a wide selection of venues to suit every style and budget.</li>
                    <li><strong>Expert Guidance:</strong> Our team of event specialists is here to guide you every step of the way, offering personalized recommendations and expert advice.</li>
                    <li><strong>Streamlined Booking:</strong> Say goodbye to endless phone calls and emails. With our user-friendly platform, you can browse, book, and manage your event with ease.</li>
                    <li><strong>Peace of Mind:</strong> We understand that planning an event can be overwhelming. That's why we're committed to providing exceptional customer service and support throughout the process.</li>
                </ul>

                <h2>Get Started Today</h2>
                <p>
                    Ready to bring your vision to life? Browse our collection of venues and services to get started. Whether you're planning an intimate gathering or a grand celebration, Eventify is here to help you create memories that last a lifetime.
                </p>
            </div>
        </div>
    );
}

export default AboutPage;