const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
  recurrence: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: null,
  },
  status: { type: String, enum: ["pending", "triggered"], default: "pending" },
});

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;
