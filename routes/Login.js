const express = require('express')
let router = express.Router();
const Login = require('../model/Login');
router.post('/new', (req, res) => {
    const user = new Login(req.body);
    user.save().then((data) => {
        res.status(200).send(data)
    }).catch(() => {
        res.status(400).send("Failed to create new User");
    })
})

router.post('/signin', (req, res) => {

    Login.find({ Phone: req.body.phoneNumber }, (err, data) => {

        if (err) {
            res.status(400).send("User Not find....");
        }
        else {

            if (data.Passcode === req.body.passcode) {

                res.status(200).json(data);
            } else
                res.status(200).send("Login failed...")
        }
    })
})

module.exports = router;