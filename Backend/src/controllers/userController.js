// Path: Backend/src/controllers/userController.js
const { db, Table_users, Table_event } = require('../database/database.js');

// const User = require('../database/models/userSchema');
// const Event = require('../database/models/eventSchema');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
require('dotenv').config();
const AWS = require('aws-sdk');

// const secretKey = process.env.SECRET_KEY;

AWS.config.httpOptions = { timeout: 5000 };

AWS.config.update({
    region: "us-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    maxRetries: 10,
    retryDelayOptions: { base: 200 }
});


async function login(email, password) {
    try {
        const params = {
            TableName: Table_users,
            FilterExpression: "#email = :email AND #password = :password",
            ExpressionAttributeNames: {
                "#email": "email",
                "#password": "password"
            },
            ExpressionAttributeValues: {
                ":email": email,
                ":password": password
            }
        };

        const result = await db.scan(params).promise();
        if (result.Items.length === 0) {
            throw new Error("Invalid email or password");
        }

        // Assuming there's only one user with the given email and password,
        // return the first item found
        return result.Items[0];
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error; // Throw the error to be handled by the caller
    }
}

async function register(name, dob, email, password,/* ImageProfile*/) {
    try {
        const params = {
            TableName: Table_users,
            Item: {
                "id": uuid(), // Generate a unique ID for the user
                "name": name,
                "dob": dob,
                "email": email,
                "password": password                // "ImageProfile": ImageProfile
                // Add more attributes if needed
            }
        };

        // Put the item into the table
        await db.put(params).promise();

        return { message: 'User registered successfully' };
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; // Throw the error to be handled by the caller
    }
}



async function user_create_event(name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description) {
    try {
        const params = {
            TableName: Table_event,
            Item: {
                "id": uuid(), // Generate a unique ID for the user
                "name": name,
                "date": date,
                "Capacity": Capacity,
                "Location": Location,
                "BookedPlaces": BookedPlaces,
                "Owner": Owner,
                "Category": Category,
                "Image": Image,
                "Duration": Duration,
                "Description": Description,


                // Add more attributes if needed
            }
        };

        // Put the item into the table
        await db.put(params).promise();

        return { message: 'event added successfully' };
    } catch (error) {
        console.error("Error event not added:", error);
        throw error; // Throw the error to be handled by the caller
    }
}

async function user_delete_event(id) {
    try {
        const params = {
            TableName: Table_event,
            Key: {
                "id": id
            }
        };

        // Delete the item from the table
        await db.delete(params).promise();

        return { message: 'event deleted successfully' };
    } catch (error) {
        console.error("Error event not deleted:", error);
        throw error; // Throw the error to be handled by the caller
    }
}

async function user_update_event(id, name, date, Capacity, Location, BookedPlaces, Owner, Category, Image, Duration, Description) {
    try {
        const params = {
            TableName: Table_event,
            Key: {
                "id": id
            },
            UpdateExpression: "set #name = :name, #date = :date, #Capacity = :Capacity, #Location = :Location, #BookedPlaces = :BookedPlaces, #Owner = :Owner, #Category = :Category, #Image = :Image, #Duration = :Duration, #Description = :Description",
            ExpressionAttributeNames: {
                "#name": "name",
                "#date": "date",
                "#Capacity": "Capacity",
                "#Location": "Location",
                "#BookedPlaces": "BookedPlaces",
                "#Owner": "Owner",
                "#Category": "Category",
                "#Image": "Image",
                "#Duration": "Duration",
                "#Description": "Description"
            },
            ExpressionAttributeValues: {
                ":name": name,
                ":date": date,
                ":Capacity": Capacity,
                ":Location": Location,
                ":BookedPlaces": BookedPlaces,
                ":Owner": Owner,
                ":Category": Category,
                ":Image": Image,
                ":Duration": Duration,
                ":Description": Description
            }
        };

        // Update the item in the table
        await db.update(params).promise();

        return { message: 'event updated successfully' };
    } catch (error) {
        console.error("Error event not updated:", error);
        throw error; // Throw the error to be handled by the caller
    }
}

<<<<<<< HEAD

module.exports = { login, register, user_create_event }
=======
module.exports = { login, register, user_create_event, user_delete_event, user_update_event }
>>>>>>> 45e5ec2839bdbc28e3dd0c40049312be62434505

// Path: Backend/src/controllers/userController.js