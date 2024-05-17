const AWS = require('aws-sdk');

// Configure AWS SDK with credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-west-1'
});

// Create Lambda instance
const lambda = new AWS.Lambda();

module.exports = lambda;

// Path: Backend/src/lambda/lambda.js