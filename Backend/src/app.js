const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//const authenticationMiddleware = require('./middleware/authenticationMiddleware.js')
const userRouter = require('./routes/userRoute.js');
const adminRoutes = require('./routes/adminRoute.js')
//const authRouter = require('./routes/authRoutes.js')
const eventsRoute = require('./routes/eventRoute.js');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))


//app.use('/api/v1', authRouter)
//app.use(authenticationMiddleware)
 app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRoutes)

//app.get('/', (req, res) => res.send('Hello world!'))
app.use('/api/v1', eventsRoute);

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' })
})


module.exports = app
