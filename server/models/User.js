var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

// Need to have users in a schema in order to access the pre save event
var userSchema = new mongoose.Schema({
    // email: String,
    // passwd: String,
    avatar: String,
    bio: String,
    name: String,
    birthDate: Date,
});

// have to use function instead of arrow --> otherwise scope of `this` is changed
userSchema.pre('save', function (next) {
    var user = this

    if (!user.isModified('passwd'))
        return next()

    bcrypt.hash(user.passwd, null, null, (err, hash) => {
        if (err)
            return next(err)

        user.passwd = hash;
        next()
    })
})

module.exports = mongoose.model('User', userSchema)