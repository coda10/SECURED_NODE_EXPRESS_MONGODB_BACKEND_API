// importing packages
require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const Joi = require('@hapi/joi');

// import module
const authRouter = require('./routes/auth');

// Initializing Server
const app = express();

// listening on port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connecting to MongoDB Server
mongoose.connect(process.env.BD_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to MongoDB'));

// middleware
app.use(bodyParser.json());

//Route Middleware
app.use('/api/user', authRouter);

//Routes
app.get('/', (req, res) => {
    res.send('END POINT WORKING');
})