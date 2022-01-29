const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sachin:sac1234@cluster0.0cuvo.mongodb.net/whatsappdb?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection successful.....");
})
    .catch(() => {
        console.log("Connection failed....")
    });
  