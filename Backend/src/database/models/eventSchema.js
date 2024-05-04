const dynamoose = require('dynamoose');

const eventSchema = new dynamoose.Schema({
    id: String,
    name: String,
    date: Date,
    Capacity: Number,
    Location: String,
    BookedPlaces: Number,
    Owner: String,
    Category: Number,
    Image: String,
    Duration: Number,
    Description: String
});

const Event = dynamoose.model('Event', eventSchema);

module.exports = Event;