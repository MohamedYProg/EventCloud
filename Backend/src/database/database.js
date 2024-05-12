const dynamoose = require('dynamoose');

// Configure Dynamoose to use local DynamoDB instance or AWS credentials
dynamoose.aws.sdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

// Connect Dynamoose to the local or AWS DynamoDB instance
if (process.env.NODE_ENV === 'production') {
    dynamoose.aws.ddb.local(process.env.DYNAMODB_ENDPOINT);
}

module.exports = dynamoose;

// Path: Backend/src/database/database.js