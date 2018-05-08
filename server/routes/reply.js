const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reply = require("../models/Reply")
const loggedIn = require("../utils/isAuthenticated");
const isBuddy = require("../utils/isBuddy")

//Crear comentario

router.post('/new/reply/:id', loggedin, (req, res, next) => {
    const userFrom = req.user._id;
    const userTo = req.params.id;
    const { content } = req.body;
    const theReply = new Reply({
        userFrom,
        userTo,
        content
    });
     theReply.save().then(reply => res.status(200).json(reply))
     .catch(err => res.status(500).json(err));
      });

//Mostar comentarios

router.get("/buddy", isBuddy, (req, res, next) => {
    const userTo = req.user._id;
    Reply.find({userTo})
    .then(reply => res.status(200).json(reply))
    .catch(err => res.status(500).json(err));
});