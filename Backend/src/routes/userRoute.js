const express = require('express');
const router = express.Router();
const { login, register, user_create_event, user_delete_event, user_update_event, get_user } = require('../controllers/userController.js');

// Route to handle user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await login(email, password);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { name, dob, email, password } = req.body;

    try {
        if (!name || !dob || !email || !password) {
            return res.status(400).json({ error: 'All fields are required for registration' });
        }

        const result = await register(name, dob, email, password);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/profile/:userid', async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            
            return res.status(400).json({ error: 'User ID is required for fetching user profile' });
        }

        const user = await get_user(id); // Use the 'get_user' function here
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Route to handle event creation
router.post('/create_event', async (req, res) => {
    const { name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description } = req.body;

    try {
        if (!name || !date || !Capacity || !Location || !Owner || !Category || !Image || !Duration || !Description) {
            return res.status(400).json({ error: 'All fields are required for creating an event' });
        }

        const result = await user_create_event(name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description);
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle event update
router.put('/update_event', async (req, res) => {
    const { id, name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description } = req.body;

    try {
        if (!id || !name || !date || !Capacity || !Location || !Owner || !Category || !Image || !Duration || !Description) {
            return res.status(400).json({ error: 'All fields are required for updating an event' });
        }

        const result = await user_update_event(id, name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description);
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle event deletion
router.delete('/delete_event/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: 'Event ID is required for deleting an event' });
        }

        const result = await user_delete_event(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
