const express = require('express');
const router = express.Router();
const { getAllEvents, getEventsByCategory, fetchEventById, booking, searchEventsByName } = require('../controllers/eventController.js');

router.get('/events', getAllEvents);
router.get('/events/category/:category', getEventsByCategory);
router.get('/events/:id', fetchEventById);
router.post('/events/booking', booking);
router.get('/events/search', searchEventsByName);

module.exports = router;
