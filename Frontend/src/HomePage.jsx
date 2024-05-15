import React from 'react';

function HomePage() {
    return (
        <div className="HomePage">
            <header className="App-header">
                <nav className="Menu-bar">
                    {/* Your menu items go here */}
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <div className="Content">
                {/* Your main content goes here */}
                <h1>Welcome to the Home Page!</h1>
                <p>This is your Events booking website.</p>
            </div>
        </div>
    );
}

export default HomePage;
