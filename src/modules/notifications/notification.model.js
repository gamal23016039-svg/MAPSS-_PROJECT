
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    channel: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    sentAt: {
      type: Date,
    },

    errorMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
