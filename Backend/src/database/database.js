const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: "us-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const db = new AWS.DynamoDB.DocumentClient();

const Table_users = 'users';
const Table_event = 'Event';

module.exports = {
    db,
    Table_users,
    Table_event,
};
