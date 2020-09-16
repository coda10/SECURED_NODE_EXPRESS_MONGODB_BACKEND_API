// Import Package
//const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../model/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

// validation
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).required()
});

// Routes
//Register Routes
router.post('/register', async(req, res) => {

    try {
        // Do Validation
        const result = await schema.validateAsync({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // Check if the user does't exist
        const emailExist = await User.findOne({ email: req.body.email });

        // if user exist, end the process and return message
        if (emailExist) return res.send({ message: 'Email not available, choose another email please' });

        //If user does not exist, Create new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save().then(res.json({ user, message: 'Registration Successful' }))
            .catch(err => res.json({ err: 'Registration Failed' }));
    }
    // Send an error if any validation is wrong
    catch (err) {
        res.json({ err: err.details[0].message });
    }
});

//Login Routes
router.post('/login', async(req, res) => {
    await res.send('Login');
})

module.exports = router;