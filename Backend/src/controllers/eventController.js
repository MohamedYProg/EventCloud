const { db, Table_event } = require('../database/database.js');
const AWS = require('aws-sdk');
const Event = require('../database/models/eventSchema.js');
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

// Disable EC2 instance metadata service endpoint lookup
AWS.config.httpOptions = { timeout: 5000 }; // Setting a timeout to prevent hanging

// Initialize AWS with your credentials
// Initialize AWS with your credentials and region
AWS.config.update({
    region: "us-east-1", // Update with your desired region
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


// Update booking function in the controller to accept numberOfPlaces parameter
async function booking(eventId, numberOfPlaces) {
    try {
        if (!numberOfPlaces || isNaN(numberOfPlaces)) {
            throw new Error(`Invalid numberOfPlaces value: ${numberOfPlaces}`);
        }

        // Fetch the event by ID
        const event = await fetchEventById(eventId);

        // Check if event is fetched successfully
        if (!event) {
            throw new Error(`Event not found: ${eventId}`);
        }

        // Check if there are enough places available
        const availablePlaces = event.Capacity - event.BookedPlaces;
        if (availablePlaces < numberOfPlaces) {
            throw new Error(`Not enough places available. Requested: ${numberOfPlaces}, Available: ${availablePlaces}`);
        }

        // Update the event's booked places
        event.BookedPlaces += numberOfPlaces;

        // Define parameters for the update operation
        const params = {
            TableName: Table_event, // Ensure tableEvent is defined correctly
            Key: {
                "id": eventId
            },
            UpdateExpression: "SET BookedPlaces = :bookedPlaces",
            ExpressionAttributeValues: {
                ":bookedPlaces": event.BookedPlaces
            },
            ReturnValues: "UPDATED_NEW" // Return the updated attributes
        };

        // Perform the update operation
        const updateResult = await db.update(params).promise();

        console.log('Update Result:', updateResult);

        return event; // Return the updated event
    } catch (error) {
        console.error(`Error booking event (Event ID: ${eventId}, Requested Places: ${numberOfPlaces}):`, error);
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

module.exports = { getAllEvents, getEventsByCategory, fetchEventById, booking, searchEventsByName };

// Path: Backend/src/controllers/eventController.js