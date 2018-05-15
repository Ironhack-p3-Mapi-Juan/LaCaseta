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
router.post("/closed", isBuddy, (req, res, next) => {
  const { closed } = req.body;
  const user = req.user._id;

  Calendar.findOne({ user })
    .then(calendar => {
      if (calendar.closedDays.indexOf(closed) == -1) {
        calendar.closedDays.push(closed);
        calendar
          .save()
          .then(cal => res.status(200).json(cal))
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(404).json(err));
});

// enable day
router.post("/enable", isBuddy, (req, res, next) => {
  const { day } = req.body;
  const user = req.user._id;

  Calendar.findOne({ user })
    .then(calendar => {
      const position = calendar.closedDays.indexOf(day);
      if (position !== -1) {
        calendar.closedDays.splice(position, 1);
        calendar
          .save()
          .then(cal => res.status(200).json(cal))
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(404).json(err));
});

// get closed days
router.get("/closedDays", isBuddy, (req, res, next) => {
  const user = req.user._id;
  Calendar.findOne({ user })
    .then(calendar => calendar.closedDays)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
