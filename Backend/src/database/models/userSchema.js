
const dynamoose = require('dynamoose');

const userSchema = new dynamoose.Schema({
    id: String,
    name: String,
    dob: Date,
    email: String,
    password: String,
    ImageProfile: String
});

const User = dynamoose.model('User', userSchema);

module.exports = User;

