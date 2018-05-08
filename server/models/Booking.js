const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    dogBuddy: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending"
    },
    dates: Schema.Types.Mixed, // Momentjs range object
    totalPrice: {type: Number, min: 0, default: 0}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
