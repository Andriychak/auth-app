const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Event = require('../models/event');
const SpecialEvent = require('../models/special');

const mongoose = require('mongoose');
const db = 'mongodb://anvol:panvol@ds123029.mlab.com:23029/eventsdb';

mongoose.connect(db, err => {
    if (err) {
        console.log('Error! ' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.log('Error! '+err);
        } else {
            res.status(200).send(registeredUser);
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    res.status(200).send(user);
                }
            }
        }
    });
});

router.get('/events', (req, res) => {
    console.log("Get request for all events");
    Event.find({}, (err, events) => {
        if (err) {
            console.log("Error!" + err);
        } else {
            res.json(events);
        }
    });
});

router.get('/special', (req, res) => {
    console.log("Get request for all special events");
    SpecialEvent.find({}, (err, spEvents) => {
        if (err) {
            console.log("Error!" + err);
        } else {
            res.json(spEvents);
        }
    });
});

module.exports = router;