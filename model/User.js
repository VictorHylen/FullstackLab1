const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 200
    },
    gender: {
        type: String,
        required: true,
        min: 2,
        max: 200
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', userSchema);

