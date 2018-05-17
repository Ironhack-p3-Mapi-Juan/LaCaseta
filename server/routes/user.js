require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const loggedin = require("../utils/isAuthenticated");
const isBuddy = require("../utils/isBuddy");
const _ = require("lodash");
const fields = Object.keys(_.omit(User.schema.paths, ["__v", "_id"]));
const upload = require("../config/coludinary");

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

// Guardar favorito
router.get("/favourit/:idBuddy", loggedin, (req, res, next) => {
  User.findById(req.params.idBuddy).then(buddy => {
    if (buddy.dogBuddy) {
      User.findById(req.user._id).then(user => {
        user.favoriteBuddy.push(buddy._id);
        user.favoriteBuddy = _.uniq(user.favoriteBuddy);
        user.save().then(user => res.status(200).json(user));
      });
    }
  });
});

router.get("/removeFavourit/:idBuddy", loggedin, (req, res, next) => {
  User.findById(req.user._id).then(user => {
    let position = user.favoriteBuddy.indexOf(req.params.idBuddy);
    if (position != -1) {
      user.favoriteBuddy.splice(position, 1);
      user.save().then(user => res.status(200).json(user));
    }
  });
});

//Mostrar favoritos User

router.get("/favourit", loggedin, (req, res, next) => {
  User.findById(req.user._id)
    .populate("favoriteBuddy")
    .then(user => {
      return res.status(200).json(user.favoriteBuddy);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Editar perfil usuario

router.post("/edit", [loggedin, upload.single("file")], (req, res, next) => {
  const fields = {
    name,
    surname,
    adress,
    city,
    country,
    pc,
    email,
    infoBuddy,
    rateBuddy,
    petsBuddy,
    houseBuddy,
    zonesBuddy
  } = req.body;
  
  let update = _.pickBy(fields, _.identity);
  
  if(req.file) {
    update.pic = req.file.url;
  }

  User.findByIdAndUpdate(req.user._id, {update}, {new: true})
    .then(userEdit => {
      res.status(200).json(userEdit);
    })
    .catch(err => res.status(500).json(err));
});

//Borrar su perfil

router.get("/delete", loggedin, (req, res, next) => {
  User.findByIdAndRemove(req.user._id)
    .then(userDelete => res.status(200).json(userDelete))
    .catch(err => res.status(500).json(err));
});

//Perfil público del canguro

router.get("/buddy/:id", loggedin, (req, res, next) => {
  User.findOne({ _id: req.params.id, dogBuddy: true })
    .then(userBuddy => {
      return res.status(200).json(userBuddy);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Obtener usuario (made in Papu)
router.get("/get-user", loggedin, (req, res, next) => {
  User.findById(req.session.passport.user).then(user => {
    res.status(200).json(user);
  });
});

module.exports = router;
