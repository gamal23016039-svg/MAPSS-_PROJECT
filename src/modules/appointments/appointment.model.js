
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    queueNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["Confirmed", "Completed", "Cancelled", "No-Show"],
      default: "Confirmed",
      required: true,
    },

    source: {
      type: String,
      enum: ["patient", "call_center", "reception"],
      required: true,
    },

    checkedInAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    cancelledAt: {
      type: Date,
    },

    noShowReason: {
      type: String,
      enum: ["late_cancel", "absent"],
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
      required: true,
    },

    paidAmount: {
      type: Number,
      min: 0,
    },

    paidAt: {
      type: Date,
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
