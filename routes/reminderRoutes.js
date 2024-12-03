const express = require("express");
const {
  createReminder,
  retrievereminders,
  updatereminder,
  deleteReminder,
} = require("../controllers/reminderControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-reminder", authMiddleware, createReminder);
router.get("/retrieve-reminder", authMiddleware, retrievereminders);
router.put("/update-reminder/:id", authMiddleware, updatereminder);
router.delete("/delete-reminder/:id", authMiddleware, deleteReminder);

module.exports = router;
