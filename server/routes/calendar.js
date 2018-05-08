const express = require("express");
const router = express.Router();
const Calendar = require("../models/Calendar");

// new calendar
router.post("/:user", (req, res, next) => {
  const newCalendar = new Calendar({
    user: req.params.user,
    bookings: [],
    closedDays: []
  })

  if (!user) {
    return res.status(500).json({ message: "" });
  }

  newCalendar.save()
  .then( calendar => res.status(200).json(calendar))
  .catch( err => res.status(500).json(err));
});

// get calendar
router.get("/", (req, res, next) => {
  Calendar.find({})
  .populate("user")
  .populate("bookings")
  .then(calendar => res.status(200).json(calendar))
  .catch( err => res.status(500).json(err));
})


// change closed days
router.post("/closed/:id", (req, res, next) => {
  const {closed} = req.body;

  Calendar.findById(req.params.id)
  .then(calendar => calendar.closedDays.push(closed) )
  .catch(err => res.status(500).json(err));
})