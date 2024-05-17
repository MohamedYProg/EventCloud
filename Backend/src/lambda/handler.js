// handler.js

const AWS = require('aws-sdk');
const sharp = require('sharp'); // Image processing library

exports.handler = async (event, context) => {
    // Initialize S3 and other necessary AWS services
    const s3 = new AWS.S3();

    try {
        // Process the event to get information about the uploaded image
        const record = event.Records[0]; // Assuming only one record at a time
        const bucketName = record.s3.bucket.name;
        const key = record.s3.object.key;

        // Download the original image from S3
        const image = await s3.getObject({ Bucket: bucketName, Key: key }).promise();

        // Resize the image using Sharp library
        const resizedImageBuffer = await sharp(image.Body)
            .resize({ width: 300, height: 200 })
            .toBuffer();

        // Upload the resized image back to S3
        await s3.putObject({
            Bucket: bucketName,
            Key: `resized_${key}`, // Example: resized_image.jpg
            Body: resizedImageBuffer,
            ContentType: 'image/jpeg', // Adjust content type if needed
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image resized and uploaded successfully' }),
        };
    } catch (error) {
        console.error('Error processing image:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to resize and upload image' }),
        };
    }
};
