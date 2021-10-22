const db = require('./conn')
const Pusher = require('pusher');


const pusher = new Pusher({
    appId: "1238521",
    key: "7a91eac3b74c2aa64953",
    secret: "4de44a4c55d1a5bb111f",
    cluster: "mt1",
    useTLS: true
});
db.once('open', () => {
    console.log("db Connected....");
    const changeStream = db.collection("addcontactmodels").watch();
    changeStream.on("change", (change) => {
        console.log("Change occur contact ...")
        if (change.operationType === 'update') {
            const contactDetails = change.fullDocument;
            pusher.trigger('addcontactmodels', 'updated', {
                contact: contactDetails.contactList
            });
        } else {
            console.log("Error trigger Pusher ...")
        }
    })
})