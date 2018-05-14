const express = require('express');
const router  = express.Router();
const user = require("../models/User")

/* GET home page */
//Buscador index

router.post('/', (req, res, next) => {
  const { pc } = req.body
  user.find({ dogBuddy: true, pc })
  .then(buddies => {
    res.status(200).json(buddies);
  })
  .catch(error =>res.status(500).json({ message: error }))
});

//Vista todos los canguros
/* router.get('/home', (req, res, next) => {
  res.status(200).json(user);
}); */

module.exports = router;
