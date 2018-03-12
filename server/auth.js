const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const express = require('express');
const router = express.Router();
const config = require('./config');
const User = require('./models/User');

function createSendToken(response, user) {
    const payload = { sub: user._id };
    const token = jwt.encode(payload, config.JWT_SECRET);
    response.status(200).send({token});
}


router.post('/register', (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    user.save(userData, (err, newUser) => {
       if (err) {
           return res.status(500).send({ message: 'Unable to register'});
       }
       createSendToken(res, newUser);
    });
});

router.post('/login', async (req, res) => {
    const loginData = req.body;
    const user = await User.findOne({ email: loginData.email});
    if (!user) {
        return res.status(401).send({ message: 'Email or Password Invalid'});
    }
    bcrypt.compare(loginData.passwd, user.passwd, (err, isMatch) => {
        if (!isMatch) {
            return res.status(401).send({message: 'Email or Password Invalid'});
        }
        createSendToken(res, user);
    });
});

function checkAuthenticated(req, res, next) {
    if (!req.header('authorization')) {
        return res.status(401).send({message: 'Unauthorized: Missing auth header'});
    }

    const token = req.header('authorization').split(' ')[1];

    const payload = jwt.decode(token, config.JWT_SECRET);
    if(!payload) {
        return res.status(401).send({message: 'Unauthorized: Invalid Auth Header'});
    }
    req.userId = payload.sub;
    next();
}

const auth = {
    router,
    checkAuthenticated: checkAuthenticated
}

module.exports = auth;

