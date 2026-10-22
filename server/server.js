const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const projectRoutes = require("./routes/projects");
const notificationRoutes = require("./routes/notifications");
const Message = require("./models/Message");
const Project = require("./models/Project");
const Task = require("./models/Task");
const Notification = require("./models/Notification");
const cron = require("node-cron");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});


io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;

    next();
  } catch (error) {
    next(new Error("Invalid authentication token"));
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-project", async (projectId, callback) => {
    try {
      if (
        typeof projectId !== "string" ||
        !mongoose.isValidObjectId(projectId)
      ) {
        return callback?.({
          success: false,
          message: "Invalid project ID",
        });
      }

      const project = await Project.findOne({
        _id: projectId,
        $or: [
          { user: socket.userId },
          { members: socket.userId },
        ],
      });

      if (!project) {
        return callback?.({
          success: false,
          message: "You do not have access to this project",
        });
      }

      socket.join(`project-${projectId}`);


await Message.updateMany(
  {
    projectId,
    sender: { $ne: socket.userId },
    readBy: { $ne: socket.userId },
  },
  {
    $addToSet: { readBy: socket.userId },
  }
);

const messages = await Message.find({ projectId })
  .sort({ createdAt: -1 })
  .limit(50)
  .populate("sender", "name email");

callback?.({
  success: true,
  message: "Joined project chat",
  messages: messages.reverse(),
});
    } catch (error) {
      console.error("Join project chat error:", error.message);

      callback?.({
        success: false,
        message: "Could not join project chat",
      });
    }
  });

  
  socket.on("send-message", async (data, callback) => {
    try {
      const { projectId, text } = data || {};

      if (
        typeof projectId !== "string" ||
        !mongoose.isValidObjectId(projectId)
      ) {
        return callback?.({
          success: false,
          message: "Invalid project ID",
        });
      }

      if (typeof text !== "string" || !text.trim() || text.trim().length > 2000) {
        return callback?.({
          success: false,
          message: "Message must contain 1–2000 characters",
        });
      }

      const room = `project-${projectId}`;

      if (!socket.rooms.has(room)) {
        return callback?.({
          success: false,
          message: "Join this project's chat first",
        });
      }

      const project = await Project.findOne({
        _id: projectId,
        $or: [
          { user: socket.userId },
          { members: socket.userId },
        ],
      });

      if (!project) {
        socket.leave(room);
        return callback?.({
          success: false,
          message: "You do not have access to this project",
        });
      }

      const message = await Message.create({
        projectId,
        sender: socket.userId,
        text: text.trim(),
        readBy: [socket.userId],
      });

      const savedMessage = await Message.findById(message._id)
        .populate("sender", "name email");

      io.to(room).emit("new-message", savedMessage);

      callback?.({ success: true });
    } catch (error) {
      console.error("Send message error:", error.message);

      callback?.({
        success: false,
        message: "Could not send message",
      });
    }
  });

  socket.on("get-unread-count", async (callback) => {
  try {
    const projects = await Project.find({
      $or: [
        { user: socket.userId },
        { members: socket.userId },
      ],
    }).select("_id");

    const projectIds = projects.map((project) => project._id);

    const unreadCount = await Message.countDocuments({
      projectId: { $in: projectIds },
      sender: { $ne: socket.userId },
      readBy: { $ne: socket.userId },
    });

    callback?.({
      success: true,
      unreadCount,
    });
  } catch (error) {
    console.error("Unread message count error:", error.message);
    callback?.({
      success: false,
      unreadCount: 0,
    });
  }
});


  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);


const getIndiaDate = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
};

const addDays = (dateString, days) => {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const checkDeadlineReminders = async () => {
  try {
    const today = getIndiaDate();
    const tomorrow = addDays(today, 1);

    console.log(
      `[Deadline Reminder] Checking tasks for ${today} and ${tomorrow} (IST)`
    );

    const tasks = await Task.find({
      status: { $ne: "Done" },
      date: { $in: [today, tomorrow] },
    });

    let createdCount = 0;

    for (const task of tasks) {
      const deadline = task.date;
      const isDueToday = deadline === today;

      const recipient = task.assignedTo || task.user;
      if (!recipient) continue;

      const reminderKey = `deadline:${task._id}:${deadline}`;

      const alreadySent = await Notification.findOne({
        user: recipient,
        task: task._id,
        type: "deadline_reminder",
        message: { $regex: reminderKey },
      });

      if (alreadySent) continue;

      await Notification.create({
        user: recipient,
        task: task._id,
        type: "deadline_reminder",
        message: `${isDueToday ? "Due today" : "Due tomorrow"}: "${task.title}" (${reminderKey})`,
      });

      createdCount++;
    }

    console.log(
      `[Deadline Reminder] Check complete. ${createdCount} reminder(s) created.`
    );
  } catch (error) {
    console.error("Deadline reminder check failed:", error);
  }
};


cron.schedule(
  "0 9 * * *",
  checkDeadlineReminders,
  {
    timezone: "Asia/Kolkata",
  }
);


app.get("/", (req, res) => {
  res.send("WorkSync backend is running!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
  console.log(`WorkSync server running on port ${PORT}`);

  
  checkDeadlineReminders();
});
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
