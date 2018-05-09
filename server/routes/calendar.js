const express = require("express");
const router = express.Router();
const Calendar = require("../models/Calendar");
const isBuddy = require("../utils/isBuddy");

// new calendar
router.get("/new", isBuddy, (req, res, next) => {
  const newCalendar = new Calendar({
    user: req.user._id,
    bookings: [],
    closedDays: []
  });

  newCalendar
    .save()
    .then(calendar => res.status(200).json(calendar))
    .catch(err => res.status(500).json(err));
});

// get calendar
router.get("/", isBuddy, (req, res, next) => {
  Calendar.find({})
    .populate("user")
    .populate("bookings")
    .then(calendar => res.status(200).json(calendar))
    .catch(err => res.status(500).json(err));
});

// change closed days
router.post("/closed/:id", (req, res, next) => {
  const { closed } = req.body;

  Calendar.findById(req.params.id)
    .then(calendar => calendar.closedDays.push(closed))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
