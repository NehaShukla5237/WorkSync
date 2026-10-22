const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Please log in first.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({
      message: "Session expired. Please log in again.",
    });
  }
}

router.get("/", authenticate, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.userId,
    })
      .populate("task", "title status")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Could not load notifications." });
  }
});


router.patch("/:id/read", authenticate, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      { isRead: true },
      { returnDocument: "after" }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    res.json(notification);
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({
      message: "Could not update notification.",
    });
  }
});

module.exports = router;
