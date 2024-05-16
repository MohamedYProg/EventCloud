const { db, Table_event } = require('../database/database.js');
const AWS = require('aws-sdk');
const Event = require('../database/models/eventSchema.js');
const Event = require('../models/Event');

// Disable EC2 instance metadata service endpoint lookup
AWS.config.httpOptions = { timeout: 5000 }; // Setting a timeout to prevent hanging

// Initialize AWS with your credentials
// Initialize AWS with your credentials and region
AWS.config.update({
    region: "us-west-1", // Update with your desired region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    maxRetries: 10,
    retryDelayOptions: { base: 200 }
});

async function getAllEvents() {
    try {
        const params = {
            TableName: Table_event
        };

        const result = await db.scan(params).promise();
        return result.Items; // Returns an array of all event items
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error; // Throw the error to be handled by the caller
    }
}
async function getEventsByCategory(category) {
    try {
        const params = {
            TableName: Table_event,
            FilterExpression: "Category = :Category",
            ExpressionAttributeValues: {
                ":Category": category
            }
            // You can add more parameters here if needed, like sorting or limiting results
        };

        const result = await db.scan(params).promise();
        return result.Items; // Returns an array of event items with the specified category
    } catch (error) {
        console.error("Error fetching events by category:", error);
        throw error; // Throw the error to be handled by the caller
    }
}


async function fetchEventById(id) {
    try {
        const params = {
            TableName: Table_event,
            Key: {
                "id": id
            }
        };

        const result = await db.get(params).promise();
        return result.Item; // Returns the event item with the specified ID
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error; // Throw the error to be handled by the caller
    }
}


async function booking(eventId, numberOfPlaces) {
    try {
        // Fetch the event by ID
        const event = await fetchEventById(eventId);

        // Update the event's capacity and booked places
        event.Capacity -= numberOfPlaces;
        event.BookedPlaces += numberOfPlaces;

        // Update the event in the database
        const params = {
            TableName: Table_event,
            Key: {
                "id": eventId
            },
            UpdateExpression: "SET #capacity = :capacity, BookedPlaces = :bookedPlaces",
            ExpressionAttributeNames: {
                "#capacity": "Capacity"
            },
            ExpressionAttributeValues: {
                ":capacity": event.Capacity,
                ":bookedPlaces": event.BookedPlaces
            },
            ReturnValues: "UPDATED_NEW" // Return the updated attributes
        };

        await db.update(params).promise();

        return event; // Return the updated event
    } catch (error) {
        console.error("Error booking event:", error);
        throw error; // Throw the error to be handled by the caller
    }
}

async function searchEventsByName(name) {
    try {
        const params = {
            TableName: Table_event,
            FilterExpression: "contains (#eventName, :name)",
            ExpressionAttributeNames: {
                "#eventName": "name" // Alias "name" to "#eventName"
            },
            ExpressionAttributeValues: {
                ":name": name
            }
        };

        const result = await db.scan(params).promise();
        return result.Items; // Returns an array of event items with names containing the specified query
    } catch (error) {
        console.error("Error searching events by name:", error);
        throw error; // Throw the error to be handled by the caller
    }
}

// // Create a new event with info from the body only
// // Not TESTED YET
// async function createEvent(eventData) {
//     try {
//         const newEvent = new Event(eventData);

//         // Save the new event to the database
//         await newEvent.save();

//         return newEvent; // Return the newly created event
//     } catch (error) {
//         console.error("Error creating event:", error);
//         throw error; // Throw the error to be handled by the caller
//     }
// }

async function deleteEvent(eventId) {
    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        // Delete the event
        await Event.findByIdAndDelete(eventId);

        return { message: 'Event deleted successfully' };
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}

module.exports = { getAllEvents, getEventsByCategory, fetchEventById, booking, searchEventsByName, deleteEvent};

// Path: Backend/src/controllers/eventController.js