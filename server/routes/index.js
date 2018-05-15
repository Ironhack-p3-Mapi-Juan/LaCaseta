const express = require("express");
const router = express.Router();
const user = require("../models/User");
const calendar = require("../models/Calendar");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);
let _ = require("lodash");
/* GET home page */
//Buscador index

router.post("/", (req, res, next) => {
  const { pc } = req.body;
  const { startDay, endDay } = req.body;
  const greenFreeBuddy = [];
  const redFreeBuddy = [];
  const yellowFreeBuddy = [];
  const datesBuddy = [];
  const range = moment.range(startDay, endDay);
  /* user.find({ dogBuddy: true, pc })
    .then(buddies => {
      buddies.forEach(e => {
        calendar.find({ user: e._id }).then(calendar => {
          if (calendar.length > 0) {
            calendar[0].closedDays.forEach(date => {
              datesBuddy.push(range.contains(moment(date)));
              let colorBuddy = _.uniq(datesBuddy);

              if (colorBuddy.length == 2) {
                if (yellowFreeBuddy.indexOf(e) == -1) {
                  yellowFreeBuddy.push(e);
                }
              } else if (colorBuddy.length == 1 && colorBuddy[0] == true) {
                if (redFreeBuddy.indexOf(e) == -1) {
                  redFreeBuddy.push(e);
                }
              } else if (colorBuddy.length == 1 && colorBuddy[0] == false) {
                if (greenFreeBuddy.indexOf(e) == -1) {
                  greenFreeBuddy.push(e);
                }
              }
            });
          }
        });
      });
      console.log(greenFreeBuddy, redFreeBuddy, yellowFreeBuddy);
      res.status(200).json({
          green: greenFreeBuddy,
          yellow: yellowFreeBuddy,
          red: redFreeBuddy
        });
    }) */
    calendar.find()
    .populate('user')
    .then(calendars=> {
      console.log(calendars)
      res.status(200).json(calendars)
    })
    .catch(error => res.status(500).json({ message: error }));
});

//Vista todos los canguros
/* router.get('/home', (req, res, next) => {
  res.status(200).json(user);
}); */

module.exports = router;
