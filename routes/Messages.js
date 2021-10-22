const express = require('express')
const router = express.Router();
const Message = require('../model/messages')
const Login = require('../model/Login')


router.post('/new', (req, res) => {
    const dbMessage = req.body;
    const user = new Message(dbMessage);
    user.save().then((data) => {
        res.status(201).json(data);
    }).catch((error) => {
        res.status(500).send(error)
    })

})


router.get('/:id', (req, res) => {
    Message.find({ conversationId: req.params.id }).then((data) => {
        if (data)
            res.status(200).json(data);
        else
            res.status(500).send("NO conversation found...");
    }).catch((error) => { res.status(500).json(error) });
})

router.get('/getReciverDetails/:id', (req, res) => {
    Login.findById(req.params.id).then((data) => {
        if (data) {
            res.status(200).json(data);
            console.log(data);
        } else
            res.status(200).send("No data found.. in user")
    }).catch((error) => { res.status(500).send(error) });
})


module.exports = router;