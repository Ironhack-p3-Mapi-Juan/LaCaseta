const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    closedDays: Array
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = Calendar;
