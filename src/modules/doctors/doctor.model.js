
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    clinicIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
      },
    ],

    specialtyIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialty",
        required: true,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
