import React from 'react';
import { Link } from 'react-router-dom';

function ContactUsPage() {
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
            <div className="contact-us-page">
                <h1>Contact Us</h1>
                <p>Have questions or need assistance? We're here to help!</p>

                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p>If you have any inquiries or need support, feel free to reach out to us:</p>
                    <ul>
                        <li><strong>Email:</strong> info@eventify.com</li>
                        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    </ul>
                </div>

                <div className="business-hours">
                    <h2>Business Hours</h2>
                    <p>Our team is available to assist you during the following hours:</p>
                    <p><strong>Monday - Friday:</strong> 9:00am - 6:00pm (EST)</p>
                    <p><strong>Saturday - Sunday:</strong> Closed</p>
                </div>

                <div className="location">
                    <h2>Visit Us</h2>
                    <p>If you prefer to speak with us in person, you can find us at:</p>
                    <p>123 Main Street, Cityville, State, Zip</p>
                </div>

                <div className="social-media">
                    <h2>Connect With Us</h2>
                    <p>Stay updated on the latest events and news by following us on social media:</p>
                    <ul>
                        <li><a href="https://www.facebook.com/eventify" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com/eventify" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://www.instagram.com/eventify/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;
