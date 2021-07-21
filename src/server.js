const express = require('express');
const Message = require('../model/dbMessages')
const Pusher = require('pusher')
require('../db/conn')

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    const user = new Message(dbMessage);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch(() => {
        res.send("Message not sent....")
    })

})

app.get('/messages/sync', (req, res) => {
    Message.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


app.listen(port, () => {
    console.log('Listining on port ' + port);
})