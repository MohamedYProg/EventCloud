const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// Parse JSON bodies for POST requests

// Other middleware and routes setup...

app.use(bodyParser.json());

const userRouter = require('./routes/userRoute.js');
const eventsRoute = require('./routes/eventRoute.js');


//app.get('/', (req, res) => res.send('Hello world!'))
app.use('/api', userRouter);
app.use('/api', eventsRoute);



module.exports = app;
