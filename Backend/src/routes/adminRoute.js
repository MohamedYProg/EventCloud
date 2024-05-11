const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorizationMiddleware.js');
const adminController = require('../controllers/adminController.js');

// Admin CRUD
router.post('/admin', auth(["admin"]), adminController.createAdmin);
router.get('/admin', auth(["admin"]), adminController.getAllAdmins);
router.put('/admin/:id', auth(["admin"]), adminController.updateAdminById);
router.delete('/admin/:id', auth(["admin"]), adminController.deleteAdminById);

// Event CRUD
router.post('/event', auth(["admin"]), adminController.createEvent);
router.get('/event/:id', auth(["admin"]), adminController.getEventById);
router.get('/event', auth(["admin"]), adminController.getAllEvents);
router.put('/event/:id', auth(["admin"]), adminController.updateEventById);
router.delete('/event/:id', auth(["admin"]), adminController.deleteEventById);

// Accept/Reject Event
router.post('/event/accept/:id', auth(["admin"]), adminController.acceptEvent);
router.post('/event/reject/:id', auth(["admin"]), adminController.rejectEvent);

module.exports = router;
