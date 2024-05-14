const express = require('express');
const router = express.Router();
const { login } = require('../controllers/userController.js');

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

module.exports = router;
