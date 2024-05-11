// adminRoutes.js

const express = require('express');
const auth = require('../middleware/authorizationMiddleware.js');
const router = express.Router();
const adminController = require('..//controllers/adminController.js');
const Admin = require('../database/models/adminSchema.js');

router.post('/admin', auth(["admin"]), adminController.createAdmin);

router.get('/admin', auth(["admin"]), adminController.getAllAdmins);

router.delete('/admin/:id', auth(["admin"]), adminController.deleteAdminById);

router.get('/admin/:id', auth(["admin"]), adminController.getAdminById);

router.put('/admin/:id', auth(["admin"]), adminController.updateAdminById);

router.post('/admin/acceptEvent/:id', auth(["admin"]), adminController.acceptEvent);

router.post('/admin/rejectEvent/:id', auth(["admin"]), adminController.rejectEvent);

router.post('/admin/acceptUser/:id', auth(["admin"]), adminController.acceptUser);

router.post('/admin/createEvent', auth(["admin"]), adminController.createEvent);

router.post('/admin/rejectEvent', auth(["admin"]), adminController.rejectEvent);

router.post('/admin/getAllEvents', auth(["admin"]), adminController.getAllEvents);

router.post('/admin/deleteEventById', auth(["admin"]), adminController.deleteEventById);

router.post('/admin/getEventById', auth(["admin"]), adminController.getEventById);

router.post('/admin/getEventById', auth(["admin"]), adminController.getEventById);



module.exports = router;

// Path: Backend/src/routes/index.js