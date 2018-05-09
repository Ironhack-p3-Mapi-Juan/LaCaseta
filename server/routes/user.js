const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const loggedin = require("../utils/isAuthenticated");
const isBuddy = require ("../utils/isBuddy")
const _ = require ("lodash")
const fields = Object.keys(_.omit(User.schema.paths, ["__v", "_id"]));

//Mostar perfil user

router.get("/profile", loggedin, (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Mostrar favoritos User

router.get("/favorit", loggedin, (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      return res.status(200).json(user.favoriteBuddy);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Editar perfil usuario

router.put("/edit", loggedin, (req, res, next) => {
    const updates = _.pick(req.body, fields);

  User.findByIdAndUpdate(req.user._id, updates, {new: true})
    .then(userEdit => res.status(200).json(userEdit))
    .catch(err => res.status(500).json(err));
});

//Borrar su perfil

router.get("/delete", loggedin, (req, res, next) => {

  User.findByIdAndRemove(req.user._id)
    .then(userDelete => res.status(200).json(userDelete))
    .catch(err => res.status(500).json(err));
});

//Perfil público del canguro

router.get("/buddy/:id", loggedin, (req, res, next) =>{
    User.findOne({_id: req.params.id, dogBuddy: true })
    .then(userBuddy => {
      return res.status(200).json(userBuddy);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = router;