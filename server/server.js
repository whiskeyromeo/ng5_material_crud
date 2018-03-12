const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const express = require('express');
const app = express();
const jwt = require('jwt-simple');
const seedUsers = require('./users');
const mongoose = require('mongoose');
const config = require('./config');
const auth = require('./auth');

const User = require('./models/User');
const Note = require('./models/Note');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@ds257838.mlab.com:57838/contact-manager`, (err) => {
    if (!err) {
        console.log('connected to mongo');
    }
})

app.get('/', async (req, res) => {
    try {
        var users = await User.find({}, '-__v');
    } catch(err) {
        console.log('there was an error retrieving the users');
        res.status(500);
    }

    res.send({users});
});

app.post('/user', (req, res) => {
    const user = new User({
        avatar: req.body.avatar || '',
        bio: req.body.bio || '',
        name: req.body.name,
        birthDate: req.body.birthDate || Date().now(),
    });

    user.save(user,  (err, result) => {
        if (err) {
            console.log('user save error: ', err);
            res.status(500).send({message: 'Could not save user'});
        } else {
            res.status(200).send();
        }
    });
});

app.put('/user/:id', (req, res) => {
    const user = {
        avatar: req.body.avatar,
        bio: req.body.bio,
        name: req.body.name,
        birthDate: req.body.birthDate
    };
    User.findOneAndUpdate({ '_id': req.body._id }, user, { upsert: true, new: true }, (err, user) => {
        console.log('updated user: ', user);
        if (err) {
            return res.status(500).send({ message: `Could not update User ${req.body._id}` });
        }
        // Remove unwanted default properties from findOneAndUpdate response
        user = user.toObject();
        delete user['__v'];
        return res.status(200).send({ message: 'User Updated!', success: true, user });
    });
});

app.delete('/user/:id', async (req, res) => {
    console.log('deleting user: ', req.params.id);
    const noteDeleteSuccess = await Note.deleteMany({author: req.params.id}, (err, result) => {
        if (err) {
            console.log('error when deleting users notes: ', err);
            return false;
        }
        return true;
    });
    console.log('noteDeleteSuccess: ', noteDeleteSuccess);
    if(!noteDeleteSuccess) {
        console.log('failed to delete user notes');
        return res.status(500).send({ message: 'Could not delete user notes' });
    }

    User.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) {
            console.log('error when deleting user: ', err);
            return res.status(500).send({ message: 'Could not delete user'});
        }
        return res.status(200).send({message: 'Successfully deleted user and their notes'});
    });
});

app.get('/notes/:id', async (req, res) => {
    const author = req.params.id;
    const notes = await Note.find({author}, '-__v');
    res.send({notes});
});

app.get('/notes', async (req, res) => {
    var notes = {};
    try {
        notes = await Note.find({}, '-__v');
        console.log('got all notes : ', notes[0]);
    } catch(err) {
        console.error('Could not get notes');
        res.status(500).send({message: 'Could not get all notes'});
    }
    res.send({notes});
})

app.post('/note', (req, res) => {
    console.log('got posted note: ', req.body);
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        author: req.body.author
    });

    note.save(note, (err, result) => {
        if (err) {
            res.status(500).send({message: 'Failed to save new Note'});
        } else {
            res.status(200).send({message: 'Successfully added note!', success: true});
        }
    })
})

app.put('/note', (req, res) => {
    console.log('got updated note: ', req.body);
    const note = {
        title: req.body.title,
        content: req.body.content,
        updatedAt: Date.now()
    };

    Note.update({ '_id': req.body._id }, note, {upsert: true}, (err, note) => {
        if (err) {
            return res.status(500).send({message: `Could not update message ${req.body._id}`});
        }
        return res.status(200).send({message: 'Note Updated!', success:true});
    });
});


/**
 * DELETE a post
 */
app.delete('/note/:id', (req, res) => {
    console.log('deleting note :', req.params.id);
    Note.deleteOne({ _id: req.params.id },(err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting note' });
        } else {
            res.status(200).send({ message: 'Successfully deleted note' });
        }

    });
});


app.listen(3000);