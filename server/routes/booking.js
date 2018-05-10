const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const Moment = require("moment");
const MomentRange = require("moment-range");
const loggedin = require("../utils/isAuthenticated");

const moment = MomentRange.extendMoment(Moment);

// crear reserva
router.post("/:buddy", loggedin, (req, res, next) => {
  user = req.user.id;
  buddy = req.params.buddy;
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

// cambiar estado
// accepted or rejected
router.post("/status/:id", loggedin, (req, res, next) => {
  const { status } = req.body;

  var opts = { runValidators: true };
  Booking.findByIdAndUpdate(req.params.id, { status }, opts)
    .then(booking => res.status(200).json(booking))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
