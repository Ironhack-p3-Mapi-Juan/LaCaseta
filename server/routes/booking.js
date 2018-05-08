const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");

// Mostrar reservas de un usuario
router.get("/", (req, res, next) => {
  Booking.find({ user: req.user._id })
    .populate("user")
    .then(bookings => res.status(200).json(bookings))
    .catch(err => res.status(500).json(err));
});

// crear reserva
router.post("/:user/:dog", (req, res, next) => {
  const newBooking = new Booking({
    user: req.params.user,
    dog: req.params.dog,
    from: req.body.from,
    to: req.body.to
  })

  if (!user || !dog || !from || !to) {
    return res.status(500).json({ message: "" });
  }

  newBooking.save()
  .then( user => res.status(200).json(user))
  .catch( err => res.status(500).json(err));
});

// cambiar estado
// accepted or rejected
router.post("/:id", (req, res, next) => {
  const { status } = req.body;

  Booking.findByIdAndUpdate(req.params.id, { status })
    .then(booking => res.status(200).json(booking))
    .catch(err => res.status(500).json(err));
});
