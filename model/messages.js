const mongoose = require('mongoose');

const message = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    message: {
        type: String
    }
}, { timestamps: true })


const MessageContent = mongoose.model('messagecontents', message);

module.exports = MessageContent;