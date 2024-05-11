// Path: Backend/src/controllers/userController.js

const User = require('../database/models/userSchema');
const Event = require('../database/models/eventSchema'); // Assuming you have an Event model
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4; // Import uuid to generate unique IDs
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const userController = {
    register: async (req, res) => {
        const { name, dob, email, password } = req.body;
        const id = uuid(); // Generate unique ID for the user
        const newUser = new User({ id, name, dob, email, password });

        try {
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.scan('email').eq(email).exec();
            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user[0].password !== password) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Create token
            const token = jwt.sign({ email: user[0].email, role: 'user' }, secretKey);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    requestEvent: async (req, res) => {
        const { name, description, date, location, image } = req.body;

        try {
            // Check if user is authenticated
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Decode token to get user information
            const decoded = jwt.verify(token, secretKey);
            if (!decoded || !decoded.email) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Create event request
            const event = new Event({ name, description, date, location, image, requestedBy: decoded.email });
            await event.save();

            res.status(201).json({ message: 'Event request submitted successfully', event });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = userController;
