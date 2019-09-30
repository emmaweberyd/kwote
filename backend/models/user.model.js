const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'], // regex for email
        trim: true, //ignores whitespaces at beginning and end
        index: true, // for optimizing queries
        unique: true,
    },
    firstname: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
        index: true
    },
    lastname: {
        type: String,
        required: [true, "can't be blank"],
        trim: true, 
        index: true
    }
}, {
    timestamps: true,
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
const User = mongoose.model('User', userSchema);
module.exports = User;