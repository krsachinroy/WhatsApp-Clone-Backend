const mongoose = require('mongoose');

const whatsappSchema = mongoose.Schema({
    Phone: {
        type: String,
        require: true,
        unique: true,
    },
    Passcode: String,
    Username: String,
}, { timestamps: true });


const LoginContent = mongoose.model('logincontents', whatsappSchema);

module.exports = LoginContent;