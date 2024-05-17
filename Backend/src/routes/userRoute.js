const express = require('express');
const router = express.Router();
const { login, register, user_create_event,uploadFileToS3, deleteFile,user_delete_event,user_update_event } = require('../controllers/userController.js');
const multer = require('multer');

const upload = multer();

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
router.post('/register', upload.single('file'), async (req, res) => {
    const file = req.file;
    const { name, dob, email, password } = req.body;

    try {
        if (!name || !dob || !email || !password || !file) {
            return res.status(400).json({ error: 'All fields including image are required for registration' });
        }

        // Call the register function from the controller with file details
        const result = await register(name, dob, email, password, file.buffer, file.originalname, file.mimetype);

        res.status(201).json({ message: 'Registration successful', imageUrl: result.imageUrl });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Internal server error' });
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
router.put('/event/:id', async (req, res) => {
    const { id } = req.params;
    const eventData = req.body;

    try {
        await Event.update({ id }, eventData);
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error("Error updating event:", error);
    }

}
)

// router.post('/upload_photo', upload.single('photo'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'Photo file is required' });
//         }

//         // Call the upload_photo function from the controller
//         const photoUrl = await upload_photo(req.file);

//         // If photo upload is successful, return the URL of the uploaded photo
//         res.status(200).json({ imageUrl: photoUrl });
//     } catch (error) {
//         console.error("Error uploading photo:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
//});


router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;

    try {
        if (!file) {
            return res.status(400).json({ error: 'File is required' });
        }

        // Call the uploadFile function from the controller
        const result = await uploadFileToS3(file.buffer, file.originalname, file.mimetype);

        // If file upload is successful, return a success message
        res.status(200).json({ message: 'File uploaded successfully', result });
    } catch (error) {
        console.error("Error uploading file:", error);
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

    }
}
)
// Route to handle file deletion
router.delete('/delete', async (req, res) => {
    const { fileName } = req.body;

    try {
        if (!fileName) {
            return res.status(400).json({ error: 'File name is required' });
        }

        // Call the deleteFile function from the controller
        const result = await deleteFile(fileName);

        // If file deletion is successful, return a success message
        res.status(200).json({ message: 'File deleted successfully', result });
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
