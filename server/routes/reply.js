const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reply = require("../models/Reply")
const loggedin = require("../utils/isAuthenticated");
const isBuddy = require("../utils/isBuddy")

//Crear comentario

router.post('/new/:id', loggedin, (req, res, next) => {
    const userFrom = req.user._id;
    User.findOne({_id: req.params.id, dogBuddy: true })
    .then(userTo => {
        const { content } = req.body;
        const theReply = new Reply({
            userFrom,
            userTo: userTo._id,
            content
        });
        console.log(userTo);
         theReply.save().then(reply => res.status(200).json(reply))
         .catch(err => res.status(500).json(err)); 
    })
    .catch(err => res.status(500).json(err)); 
      });

//Mostar comentarios

router.get("/buddy/:id", loggedin, (req, res, next) => {
    User.findOne({_id: req.params.id, dogBuddy: true })
    .then(userBuddy => {
        Reply.find({userTo: userBuddy._id})
        .then(reply => res.status(200).json(reply))
        .catch(err => res.status(500).json(err));
    })
});

module.exports = router;