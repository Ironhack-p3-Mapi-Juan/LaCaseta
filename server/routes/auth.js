
require("dotenv").config();
const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


const logInPromise = (user, req) => new Promise((resolve,reject) => {
    req.login(user, (err) => {
        if (err) return reject('Something went wrong');
        resolve(user);
      });
});  


/* GET home page */
router.post('/signup', (req, res, next) => {
    const {name, surname, adress, city, country, pc, email, password, pic, dogs, dogBuddy, infoBuddy, rateBuddy, petsBuddy, houseBuddy, zonesBuddy,calendarId } = req.body;
  
    if (!email || !password) {
      res.status(400).json({ message: 'Provide email and password' });
      return;
    }
  
    User.findOne({ email })
    .then( user => {
        if(user) throw new Error('The email already exists');
        
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const confirmationCode = encodeURIComponent(bcrypt.hashSync(email, salt))
        const theUser = new User({
          name, 
          surname, 
          adress,
          city,
          country, 
          pc, 
          email, 
          password: hashPass,
          pic,
          dogs,
          dogBuddy, 
          infoBuddy, 
          rateBuddy, 
          petsBuddy, 
          houseBuddy, 
          zonesBuddy,
          calendarId,
          confirmationCode,
        });
    
        return theUser.save().then( user => {
            console.log(user);
            //Configuración Nodemailer
            const ActivationURL = `${process.env.HOST}/api/auth/confirm/${confirmationCode}`;
            console.log("Ruta mail " + ActivationURL);
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.emailAdmin,
                    pass: process.env.pssAdmin
                    
                }
            });
            transporter.sendMail({
                from: `"La Caseta de Juanpi" <${process.env.emailAdmin}>`,
                to: user.email, 
                subject: 'Activa tu cuenta en la Caseta de Juanpi', 
                html: `<a href="${ActivationURL}">Activa tu cuenta</a>`
            })
            logInPromise(user,req)
            return res.status(200).json(user);
        })
      .then(info => console.log(info))
      .catch(error => console.log(error))
    })
    .catch(e => res.status(500).json({message:e.message}));
});

router.get("/confirm/:confirmationCode", (req, res, next) => {
  let confirmationCode = encodeURIComponent(req.params.confirmationCode);

  User.findOneAndUpdate({ confirmationCode }, { isActive: true })
  .then(user => res.status(200).json(user))
  .catch(e => res.status(500).json({message:e.message}));
})

router.post('/login', (req, res, next) => {
    const {email, password} = req.body;
  
    if (!email || !password) {
      res.status(400).json({ message: 'Provide email and password' });
      return;
    }

    User.findOne({ email })
    .then( user => {
        if(!user) throw new Error('The email does not exist');
        if(!bcrypt.compareSync(password, user.password)) throw new Error('The password is not correct');
        return logInPromise(user,req);    
    })
    .then(user => res.status(200).json(user))
    .catch(e => res.status(500).json({message:e.message}));

});

//Comprueba si el usuario está logueado
router.get('/loggedin', (req, res) => {
    if(req.user){
        return res.status(200).json(req.user);
    }else{
        return res.status(400).json({message:"You should loggin first"});
    }
});

router.get('/logout', (req, res) => {
    if(req.user){
        req.logout();
        return res.status(200).json({message:"User logged out"});
    }else{
        return res.status(400).json({message:"You should loggin first"});
    }
});

module.exports = router;
