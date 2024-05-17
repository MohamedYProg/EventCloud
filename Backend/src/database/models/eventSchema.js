const dynamoose = require('dynamoose');

const eventSchema = new dynamoose.Schema({
    id: String,
    name: String,
    date: Date,
    capacity: Number,
    location: String,
    bookedPlaces: Number,
    owner: String,
    category: Number,
    image: String,
    duration: Number,
    description: String
});

const Event = dynamoose.model('Event', eventSchema);

module.exports = Event;
