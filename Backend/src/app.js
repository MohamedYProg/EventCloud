// app.js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200, // For some legacy browsers
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Import routes
const userRouter = require('./routes/userRoute.js');
// const adminRoutes = require('./routes/adminRoute.js')
const eventsRoute = require('./routes/eventRoute.js');

// Use routes
app.use('/api/v1/user', userRouter);
// app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1', eventsRoute);

// Catch all for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
