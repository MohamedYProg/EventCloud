// adminController.js

const Admin = require('../database/models/adminSchema.js');

exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password, imageProfile } = req.body;
        const admin = new Admin({ name, email, password, imageProfile });
        await admin.save();
        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'An error occurred while creating admin' });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.scan().exec();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error getting admins:', error);
        res.status(500).json({ error: 'An error occurred while getting admins' });
    }
};

exports.deleteAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.delete({ id });
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ error: 'An error occurred while deleting admin' });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.get({ id });
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error getting admin:', error);
        res.status(500).json({ error: 'An error occurred while getting admin' });
    }
};

exports.updateAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, imageProfile } = req.body;
        await Admin.update({ id }, { name, email, password, imageProfile });
        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ error: 'An error occurred while updating admin' });
    }
};

// Path: Backend/src/database/models/adminSchema.js