const AWS = require('aws-sdk');

// Configure AWS SDK with credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-west-1'
});

// Create Lambda instance
const lambda = new AWS.Lambda();

// Function to invoke the Lambda function
const invokeLambdaFunction = async (payload) => {
    const params = {
        FunctionName: 'YOUR_LAMBDA_FUNCTION_NAME',
        Payload: JSON.stringify(payload)
    };

    try {
        const data = await lambda.invoke(params).promise();
        return data;
    } catch (error) {
        console.error('Error invoking Lambda function:', error);
        throw error;
    }
};

// Example usage: Invoke Lambda function when a new image is uploaded
const handleImageUpload = async (imageUrl) => {
    const payload = {
        imageUrl: imageUrl // Pass the URL of the uploaded image to the Lambda function
    };

    try {
        const response = await invokeLambdaFunction(payload);
        console.log('Lambda function response:', response);
    } catch (error) {
        console.error('Error handling image upload:', error);
    }
};

// Example endpoint in your backend to handle image uploads
app.post('/upload-image', async (req, res) => {
    const { imageUrl } = req.body;
    try {
        await handleImageUpload(imageUrl);
        res.status(200).json({ message: 'Image upload successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = lambda;

// Path: Backend/src/lambda/lambda.js