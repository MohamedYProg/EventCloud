const AWS = require('aws-sdk');
const sharp = require('sharp');

// Configure AWS SDK with credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-west-1'
});

// Create S3 instance
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    
    try {
        // Fetch the uploaded image from S3
        const params = {
            Bucket: bucket,
            Key: key
        };
        const { Body } = await s3.getObject(params).promise();
        
        // Resize the image using Sharp
        const resizedImage = await sharp(Body)
            .resize(200, 200) // Change dimensions as needed
            .toBuffer();
        
        // Upload the resized image back to S3
        const uploadParams = {
            Bucket: bucket,
            Key: `resized/${key}`, // Add a prefix to the resized image
            Body: resizedImage
        };
        await s3.upload(uploadParams).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify('Image resized successfully')
        };
    } catch (error) {
        console.error('Error resizing image:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Internal server error')
        };
    }
};


module.exports = s3;

// Path: Backend/src/database/s3.js



