const Reminder = require("../models/reminderModel");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

exports.createReminder = async (req, res) => {
  try {
    const { message, time, recurrence } = req.body;
    const parsedTime = moment(time, "DD/MM/YYYY HH:mm:ss", true);

    if (!parsedTime.isValid()) {
      return res
        .status(400)
        .json({ error: "Invalid time format. Use 'DD/MM/YYYY HH:mm:ss'" });
    }

    if (parsedTime.isBefore(moment())) {
      return res.status(400).json({ error: "Time must be in the future" });
    }

    const isoTime = parsedTime.toISOString();

    const reminder = new Reminder({
      id: uuidv4(),
      userId: req.userId,
      message,
      time: isoTime,
      recurrence,
    });

    await reminder.save();

    res.status(201).json({
      id: reminder.id,
      userId: reminder.userId,
      message: reminder.message,
      time: parsedTime.format("DD/MM/YYYY HH:mm:ss"),
      recurrence: reminder.recurrence,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

exports.retrievereminders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { userId: req.userId };

    if (page <= 0 || limit <= 0) {
      return res
        .status(400)
        .json({ error: "Page and limit must be positive numbers." });
    }

    if (status && !["pending", "triggered"].includes(status.toLowerCase())) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    if (status) query.status = status.toLowerCase();

    const skip = (page - 1) * limit;

    const reminders = await Reminder.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    if (reminders.length === 0) {
      return res.status(404).json({ message: "No reminders found" });
    }

    res.status(200).json({
      message: "Reminders retrieved successfully",
      reminders,
      page: parseInt(page),
      limit: parseInt(limit),
      total: reminders.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve reminders" });
  }
};

exports.updatereminder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { message, time, recurrence, status } = req.body;

    if (time && !moment(time, "DD/MM/YYYY HH:mm:ss", true).isValid()) {
      return res
        .status(400)
        .json({
          error: "Invalid time format. Use DD/MM/YYYY HH:mm:ss format.",
        });
    }

    if (status && !["pending", "triggered"].includes(status.toLowerCase())) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    if (recurrence && typeof recurrence !== "string") {
      return res.status(400).json({ error: "Recurrence must be a string." });
    }

    const updatedFields = {};
    if (message) updatedFields.message = message;
    if (time)
      updatedFields.time = moment(time, "DD/MM/YYYY HH:mm:ss").toISOString();
    if (recurrence) updatedFields.recurrence = recurrence;
    if (status) updatedFields.status = status.toLowerCase();

    const reminder = await Reminder.findOneAndUpdate(
      { id, userId: req.userId },
      { $set: updatedFields },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found." });
    }

    res.status(200).json({
      message: "Reminder updated successfully",
      reminder: {
        id: reminder.id,
        userId: reminder.userId,
        message: reminder.message,
        time: moment(reminder.time).format("DD/MM/YYYY HH:mm:ss"),
        recurrence: reminder.recurrence,
        status: reminder.status,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update reminder" });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findOneAndDelete({
      id,
      userId: req.userId,
    });

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};
