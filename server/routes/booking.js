const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const Moment = require("moment");
const MomentRange = require("moment-range");
const loggedin = require("../utils/isAuthenticated");
const isBuddy = require("../utils/isBuddy");

const moment = MomentRange.extendMoment(Moment);

// crear reserva
router.post("/:idBuddy", loggedin, (req, res, next) => {
  user = req.user.id;
  buddy = req.params.idBuddy;
  from = req.body.from;
  to = req.body.to;
  if (!user || !buddy || !from || !to) {
    return res.status(500).json({ message: "" });
  }
  const start = moment(from);
  const end = moment(to);
  const dates = moment.range(start, end);
  console.log(dates);
  const newBooking = new Booking({
    user,
    buddy,
    start: dates.start,
    end: dates.end
  });

  newBooking
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

// Mostrar reservas de un usuario
router.get("/", loggedin, (req, res, next) => {
  Booking.find({ user: req.user._id })
    .populate("user")
    .populate("buddy")
    .then(bookings => res.status(200).json(bookings))
    .catch(err => res.status(500).json(err));
});

// mostrar reservas recibidas por un canguro
router.get("/buddy", isBuddy, (req, res, next) => {
  Booking.find({ buddy: req.user._id })
    .populate("user")
    .then(bookings => res.status(200).json(bookings))
    .catch(err => res.status(500).json(err));
});

// mostrar una reserva recibida por un canguro
router.get("/buddy/:idBook", isBuddy, (req, res, next) => {
  Booking.findById(req.params.idBook)
    .populate("user")
    .then(booking => res.status(200).json(booking))
    .catch(err => res.status(500).json(err));
});

// cambiar estado
// accepted or rejected
router.post("/status/:idBook", loggedin, (req, res, next) => {
  const { status } = req.body;

  var opts = { runValidators: true };
  Booking.findByIdAndUpdate(req.params.idBook, { status }, opts)
    .then(booking => res.status(200).json(booking))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
