const mongoose = require('mongoose');
const Pusher = require('pusher');

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

const pusher = new Pusher({
    appId: "1238521",
    key: "7a91eac3b74c2aa64953",
    secret: "4de44a4c55d1a5bb111f",
    cluster: "mt1",
    useTLS: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("db Connected....");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change) => {
        console.log("Change occur ...")
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log("Error trigger Pusher ...")
        }
    })
})
