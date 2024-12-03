const cron = require('node-cron');
const Reminder = require('../models/reminderModel');

cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const reminders = await Reminder.find({ status: 'pending', time: { $lte: now } });
    reminders.forEach(async (reminder) => {
      console.log(`Reminder Triggered: ${reminder.message}`);
      reminder.status = 'triggered';
      await reminder.save();
    });
  } catch (error) {
    console.error('Cron Job Error:', error);
  }
});
