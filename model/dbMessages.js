const mongoose = require('mongoose');

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});


const MessageContent = mongoose.model('messagecontents', whatsappSchema);

module.exports = MessageContent;