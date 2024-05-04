const dynamoose = require('dynamoose');

const adminSchema = new dynamoose.Schema({
    name: String,
    email: String,
    password: String,
    ImageProfile: String
});

const Admin = dynamoose.model('Admin', adminSchema);

module.exports = Admin;