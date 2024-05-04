// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('..//controllers/adminController.js');

router.post('/admin', adminController.createAdmin);

router.get('/admins', adminController.getAllAdmins);

router.delete('/admin/:id', adminController.deleteAdminById);

router.get('/admin/:id', adminController.getAdminById);

router.put('/admin/:id', adminController.updateAdminById);

module.exports = router;

// Path: Backend/src/routes/index.js