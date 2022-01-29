const express = require("express");
let router = express.Router();
const addContactModel = require("../model/addContact");
const Login = require("../model/Login");
router.post("/new", (req, res) => {
  Login.find({ Phone: req.body.reciverNumber }).then(async (data) => {
    const id = data[0]._id;
    const newUser = new addContactModel({
      members: [req.body.senderId, id.toString()]
    })
    try {
      const contact = await newUser.save();
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).send(err);
    }
  })
});

router.get("/loadData/:id", (req, res) => {
  try {
    addContactModel.find({
      members: { $in: [req.params.id] },
    }).then((data) => {
      res.status(200).json(data);
    })


  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/:id", (req, res) => {
  try {
    Login.findById(req.params.id).then((data) => {
      res.status(200).json(data)
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/getUserId/:phone",(req, res) => {
  try{
    Login.find({Phone: req.params.phone}).then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
  }
  catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;
