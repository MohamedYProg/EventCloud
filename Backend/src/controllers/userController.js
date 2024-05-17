// Path: Backend/src/controllers/userController.js

// const User = require('../database/models/userSchema');
// const Event = require('../database/models/eventSchema');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { db, Table_users } = require('../database/database.js');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');

const upload = multer();

const bucketName = process.env.BUCKET_NAME;
const region = "us-west-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

AWS.config.httpOptions = { timeout: 5000 };

AWS.config.update({
  region: "us-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  maxRetries: 10,
  retryDelayOptions: { base: 200 }
});

async function uploadFileToS3(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
}

async function register(name, dob, email, password, fileBuffer, fileName, mimetype) {
  try {
    // Upload image to S3
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
      };
    
      await  s3Client.send(new PutObjectCommand(uploadParams));    
      const imageUrl = `https://s3.${region}.amazonaws.com/${bucketName}/${fileName}`;
    const params = {
      TableName: Table_users,
      Item: {
        "id": uuid(),
        "name": name,
        "dob": dob,
        "email": email,
        "password": password,
        "imageUrl": imageUrl // Add image URL to DynamoDB item
      }
    };

    // Put the item into the table
    await db.put(params).promise();

    return { message: 'User registered successfully', imageUrl };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

  
  function deleteFile(fileName) {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };
  
    return s3Client.send(new DeleteObjectCommand(deleteParams));
  }
  

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


// async function uploadImage(image) {
//     try {
//         // Logic to upload image to S3 bucket
//         const s3 = new AWS.S3();
//         const params = {
//             Bucket: 'your-bucket-name',
//             Key: `${uuid()}.jpg`, // Generate a unique key for the image
//             Body: image.buffer,
//             ACL: 'public-read',
//             ContentType: image.mimetype
//         };

//         const data = await s3.upload(params).promise();
//         return data.Location; // Return the URL of the uploaded image
//     } catch (error) {
//         console.error("Error uploading image to S3:", error);
//         throw error; // Throw the error to be handled by the caller
//     }
// }



module.exports = { login, register, user_create_event,user_update_event,uploadFileToS3 ,deleteFile}

// Path: Backend/src/controllers/userController.js