const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: emailRegex,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    permission: {
        type: String,
        enum: [
            'admin',
            'moderator',
            'translator',
            'member'
        ],
        default: 'member'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema)