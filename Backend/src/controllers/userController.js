const User = require('../database/models/userSchema.js')
const uuid = require('uuid').v4;

// const userSchema = new dynamoose.Schema({
//     id: String,
//     name: String,
//     dob: Date,
//     email: String,
//     password: String,
//     ImageProfile: String
// });

const userController = {
    register: async (req, res) => {
        const { name, dob, email, password } = req.body;
        const id = uuid();
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

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}

module.exports = userController;