const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const loggedIn = require("../../utils/isAuthenticated");
const isBuddy = require ("../utils/isBuddy")

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

router.get("/edit/:id", loggedin, (req, res, next) => {
    const { formUser } = req.body;

  User.findByIdAndUpdate(req.params.id, { formUser })
    .then(userEdit => res.status(200).json(userEdit))
    .catch(err => res.status(500).json(err));
});

//Borrar su perfil

router.get("/delete/:id", loggedin, (req, res, next) => {

  User.findByIdAndRemove(req.params.id)
    .then(userDelete => res.status(200).json(userDelete))
    .catch(err => res.status(500).json(err));
});

//Perfil público del canguro

router.get("/buddy", isBuddy, (req, res, next) =>{
    User.findById(req.user._id)
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});
