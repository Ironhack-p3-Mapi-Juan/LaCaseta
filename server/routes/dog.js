const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const loggedIn = require("../../utils/isAuthenticated");

//Crear perros

router.post('/new/dog', loggedin, (req, res, next) => {
    const user = req.user._id;
    const { name, age, breed, tips, treatment, picDog } = req.body;
    const theDog = new Dog({
        user,
        name,
        age,
        breed,
        tips,
        treatment,
        picDog
    });
     theDog.save().then( dog => {
         User.findById(user).then( user =>{
             user.dogs.push(dog._id);
         })});
      });

//Mostar perros

router.get("/dogs", loggedin, (req, res, next) => {
    User.findById(req.user._id)
      .then(user => {
        return res.status(200).json(user.dogs);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });

  //Editar perfil perro

  router.get("/edit/dog/:id", loggedin, (req, res, next) => {
    const { formDog } = req.body;

  Dog.findByIdAndUpdate(req.params.id, { formDog })
    .then(dogEdit => res.status(200).json(dogEdit))
    .catch(err => res.status(500).json(err));
});

//Borrar perro

router.get("/delete/dog/:id", loggedin, (req, res, next) => {

    Dog.findByIdAndRemove(req.params.id)
      .then(dogDelete => res.status(200).json(dogDelete))
      .catch(err => res.status(500).json(err));
  });
  