const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// routes
const users = require('./routes/userRoutes');
const classes = require('./routes/classRoutes');
const activities = require('./routes/activityRoutes');
const submissions = require('./routes/submissionRoutes');

// use Routes
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/activities', activities);
app.use('/api/submissions', submissions);
app.use('/uploads', express.static('uploads'))

app.use(errorHandler)

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})