const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const loggedin = require("../utils/isAuthenticated");
const _ = require("lodash");
const fields = Object.keys(_.omit(Dog.schema.paths, ["__v", "_id"]));
const upload = require("../config/coludinary")

//Crear perros

router.post("/new", [loggedin,  upload.single("file")], (req, res, next) => {
  const user = req.user._id;
  const { name, age, breed, tips, treatment } = req.body;
  // update['picDog'] = req.file.url;
  const picDog = req.file.url;
  const theDog = new Dog({
    user,
    name,
    age,
    breed,
    tips,
    treatment,
    picDog
  });
  theDog
    .save()
    .then(dog => {
      return res.status(200).json(dog);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Mostar perros

router.get("/dogs", loggedin, (req, res, next) => {
  Dog.find({ user: req.user._id })
    .then(dog => {
      return res.status(200).json(dog);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Editar perfil perro

router.put("/edit/:id", loggedin, (req, res, next) => {
  Dog.findById(req.params.id)
    .then(dog => {
      if (req.user._id.toString() == dog.user.toString()) {
        const updates = _.pick(req.body, fields);
        Dog.findByIdAndUpdate(req.params.id, updates, { new: true })
          .then(dogEdit => res.status(200).json(dogEdit))
          .catch(err => {
            return res.status(500).json(err);
          }); 
      } else {
        return res
          .status(500)
          .json({ err: "No puedes modificar los perros de los demás" });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Borrar perro

router.get("/delete/:id", loggedin, (req, res, next) => {
Dog.findById(req.params.id)
    .then(dog => {
      if (req.user._id.toString() == dog.user.toString()) {
        Dog.findByIdAndRemove(req.params.id)
          .then(dogDelete => res.status(200).json(dogDelete))
          .catch(err => {
            return res.status(500).json(err);
          }); 
      } else {
        return res
          .status(500)
          .json({ err: "No puedes borrar los perros de los demás" });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});
//Obtener perro 
router.get("/get-dog", loggedin, (req, res, next) => {
  Dog.findById(req.session.passport.dog)
  .then(dog => {
    res.status(200).json(dog)
  })
});

module.exports = router;
