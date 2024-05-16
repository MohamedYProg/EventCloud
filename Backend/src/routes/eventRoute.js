const express = require('express');
const router = express.Router();
const { getAllEvents, getEventsByCategory, fetchEventById, booking, searchEventsByName, deleteEvent} = require('../controllers/eventController.js');

// Route to get all events
router.get('/events', async (req, res) => {
    try {
        const events = await getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// Route to get events by category
router.get('/events/category/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const events = await getEventsByCategory(category);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events by category" });
    }
});

router.get('/events/ids/:id', async (req, res) => {
    const Id = req.params.id;

    try {
        const events = await fetchEventById(Id);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events by id" });
    }
});



router.post('/:eventId/booking', async (req, res) => {
    const eventId = req.params.eventId;
    const numberOfPlaces = req.body.numberOfPlaces;

    try {
        // Fetch the event by ID to validate its existence
        const event = await fetchEventById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if there are enough places available
        if (event.Capacity < numberOfPlaces) {
            return res.status(400).json({ error: 'Not enough places available' });
        }

        // Book the specified number of places
        const bookedEvent = await booking(eventId, numberOfPlaces);
        res.status(200).json(bookedEvent);
    } catch (error) {
        console.error("Error booking event:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/events/search', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Search query parameter "name" is required in the request body' });
        }

        const events = await searchEventsByName(name);
        res.json(events);
    } catch (error) {
        console.error("Error searching events by name:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// // Route to create a new event    NOT TESTED YET
// router.post('/create-event', async (req, res) => {
//     const eventData = req.body;
//     try {
//         const newEvent = await createEvent(eventData, userName);
//         res.status(201).json(newEvent);
//     } catch (error) {
//         console.error("Error creating event:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.delete('/events/:id', async (req, res) => {
    const Id = req.params.id;

    try {
        const events = await deleteEvent(Id);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete events by id" });
    }
});

module.exports = router;

// Path: Backend/src/routes/eventRoute.js