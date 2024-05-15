import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="HomePage">
            <header className="App-header">
                <nav className="Menu-bar">
                    {/* Your menu items go here */}
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        {/* <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li> */}
                    </ul>
                </nav>
            </header>
            <div className="Content">
                <h1>Welcome to the Home Page!</h1>
                <p>This is your home page content.</p>
            </div>
        </div>
    );
}

export default HomePage;
