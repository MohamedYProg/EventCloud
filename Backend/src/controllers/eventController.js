const { db, Table_event } = require('../database/database.js');
const AWS = require('aws-sdk');
const Event = require('../database/models/eventSchema.js');
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

// Disable EC2 instance metadata service endpoint lookup
AWS.config.httpOptions = { timeout: 5000 };

// Initialize AWS with your credentials and region
AWS.config.update({
    region: "us-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    maxRetries: 10,
    retryDelayOptions: { base: 200 }
});

async function getAllEvents(req, res) {
    try {
        const params = {
            TableName: Table_event
        };

        const result = await db.scan(params).promise();
        res.status(200).json(result.Items);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getEventsByCategory(req, res) {
    const { category } = req.params;
    try {
        const params = {
            TableName: Table_event,
            FilterExpression: "Category = :Category",
            ExpressionAttributeValues: {
                ":Category": category
            }
        };

        const result = await db.scan(params).promise();
        res.status(200).json(result.Items);
    } catch (error) {
        console.error("Error fetching events by category:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function fetchEventById(req, res) {
    const { id } = req.params;

    try {
        const event = await Event.get(id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function booking(req, res) {
    const { eventId, numberOfPlaces } = req.body;
    try {
        if (!numberOfPlaces || isNaN(numberOfPlaces)) {
            return res.status(400).json({ error: `Invalid numberOfPlaces value: ${numberOfPlaces}` });
        }

        const event = await Event.get(eventId);

        if (!event) {
            return res.status(404).json({ error: `Event not found: ${eventId}` });
        }

        const availablePlaces = event.Capacity - event.BookedPlaces;
        if (availablePlaces < numberOfPlaces) {
            return res.status(400).json({ error: `Not enough places available. Requested: ${numberOfPlaces}, Available: ${availablePlaces}` });
        }

        event.BookedPlaces += numberOfPlaces;

        const params = {
            TableName: Table_event,
            Key: {
                "id": eventId
            },
            UpdateExpression: "SET BookedPlaces = :bookedPlaces",
            ExpressionAttributeValues: {
                ":bookedPlaces": event.BookedPlaces
            },
            ReturnValues: "UPDATED_NEW"
        };

        const updateResult = await db.update(params).promise();
        res.status(200).json(updateResult.Attributes);
    } catch (error) {
        console.error(`Error booking event (Event ID: ${eventId}, Requested Places: ${numberOfPlaces}):`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function searchEventsByName(req, res) {
    const { name } = req.query;
    try {
        const params = {
            TableName: Table_event,
            FilterExpression: "contains (#eventName, :name)",
            ExpressionAttributeNames: {
                "#eventName": "name"
            },
            ExpressionAttributeValues: {
                ":name": name
            }
        };

        const result = await db.scan(params).promise();
        res.status(200).json(result.Items);
    } catch (error) {
        console.error("Error searching events by name:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAllEvents, getEventsByCategory, fetchEventById, booking, searchEventsByName };
