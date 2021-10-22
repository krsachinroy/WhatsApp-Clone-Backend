const mongoose = require('mongoose');


const addContactSchema = mongoose.Schema({
    members: {
        type: Array
    }
}, { timestamps: true });


const addContactModel = mongoose.model('addcontactmodels', addContactSchema);



module.exports = addContactModel;