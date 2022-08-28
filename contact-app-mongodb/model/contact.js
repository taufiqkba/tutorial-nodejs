const mongoose = require('mongoose')

// create schema
const Contact = mongoose.model('Contact', {
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,

    }
})

module.exports = Contact