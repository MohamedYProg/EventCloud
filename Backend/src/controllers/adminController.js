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

exports.acceptEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.update({ id }, { status: 'accepted' });
        res.status(200).json({ message: 'Event accepted successfully' });
    } catch (error) {
        console.error('Error accepting event:', error);
        res.status(500).json({ error: 'An error occurred while accepting event' });
    }
};

exports.rejectEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.update({ id }, { status: 'rejected' });
        res.status(200).json({ message: 'Event rejected successfully' });
    } catch (error) {
        console.error('Error rejecting event:', error);
        res.status(500).json({ error: 'An error occurred while rejecting event' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, location, image, status } = req.body;
        const event = new Event({ name, description, date, location, image, status });
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'An error occurred while creating event' });
    }
}

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.scan().exec();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error getting events:', error);
        res.status(500).json({ error: 'An error occurred while getting events' });
    }
}

exports.deleteEventById = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.delete({ id });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'An error occurred while deleting event' });
    }
}

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.get({ id });
        res.status(200).json(event);
    } catch (error) {
        console.error('Error getting event:', error);
        res.status(500).json({ error: 'An error occurred while getting event' });
    }
}

exports.updateEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, date, location, image, status } = req.body;
        await Event.update({ id }, { name, description, date, location, image, status });
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'An error occurred while updating event' });
    }
}

// Path: Backend/src/database/models/adminSchema.js