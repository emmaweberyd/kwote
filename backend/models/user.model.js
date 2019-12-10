const mongoose = require('mongoose');
var friends = require("mongoose-friends")
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'], // regex for email
        trim: true, //ignores whitespaces at beginning and end
        index: true, // for optimizing queries
        unique: true
    },
    firstname: {
        type: String,
        required: [true, "Firstname can't be blank"],
        trim: true,
        index: true
    },
    lastname: {
        type: String,
        required: [true, "Lastname can't be blank"],
        trim: true, 
        index: true
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"],
        minlength: [8, "Password needs at least 8 characters"]
    }
}, {
    timestamps: true,
});

UserSchema.pre('save', function(next) { 
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
    
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
    
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
UserSchema.plugin(friends());
const User = mongoose.model('User', UserSchema);
module.exports = User;