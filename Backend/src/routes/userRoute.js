const express = require('express');
const router = express.Router();
const { login, register, user_create_event, user_delete_event, user_update_event } = require('../controllers/userController.js');

// Route to handle user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Call the login function from the controller
        const user = await login(email, password);

        // If login is successful, you can return user details or a success message
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { name, dob, email, password,/* ImageProfile */ } = req.body;

    try {
        if (!name || !dob || !email || !password/* || !ImageProfile */) {
            return res.status(400).json({ error: 'All fields are required for registration' });
        }

        // Call the register function from the controller
        const result = await register(name, dob, email, password/*, ImageProfile */);

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/create_event', async (req, res) => {
    const { name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description } = req.body;

    try {
        // Check if all required fields are provided
        if (!name || !date || !Capacity || !Location || !Owner || !Category || !Image || !Duration || !Description) {
            return res.status(400).json({ error: 'All fields are required for creating an event' });
        }

        // Call the user_create_event function from the controller
        const result = await user_create_event(name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description);

        // If event creation is successful, you can return a success message
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: 'Internal server error' });
    }

    router.put('/update_event', async (req, res) => {
        const { id, name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description } = req.body;
    
        try {
            // Check if all required fields are provided
            if (!id || !name || !date || !Capacity || !Location || !Owner || !Category || !Image || !Duration || !Description) {
                return res.status(400).json({ error: 'All fields are required for updating an event' });
            }
    
            // Call the user_update_event function from the controller
            const result = await user_update_event(id, name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description);
    
            // If event update is successful, you can return a success message
            res.status(200).json({ message: 'Event updated successfully' });
        } catch (error) {
            console.error("Error updating event:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.delete('/delete_event', async (req, res) => {
        const { id } = req.body;
    
        try {
            // Check if the event ID is provided
            if (!id) {
                return res.status(400).json({ error: 'Event ID is required for deleting an event' });
            }
    
            // Call the user_delete_event function from the controller
            const result = await user_delete_event(id);
    
            // If event deletion is successful, you can return a success message
            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            console.error("Error deleting event:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

router.delete('/delete_event/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Call the user_delete_event function from the controller
        const result = await user_delete_event(id);

        // If event deletion is successful, you can return a success message
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update_event/:id', async (req, res) => {
    const id = req.params.id;
    const { name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description } = req.body;

    try {
        // Check if all required fields are provided
        if (!name || !date || !Capacity || !Location || !Owner || !Category || !Image || !Duration || !Description) {
            return res.status(400).json({ error: 'All fields are required for updating an event' });
        }

        // Call the user_update_event function from the controller
        const result = await user_update_event(id, name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description);

        // If event update is successful, you can return a success message
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
