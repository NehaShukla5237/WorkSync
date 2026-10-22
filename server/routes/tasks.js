const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

const router = express.Router();

// Verify login token
async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please log in first." });
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
    const accessibleProjects = await Project.find({
      $or: [{ user: req.userId }, { members: req.userId }],
    }).select("_id");

    const projectIds = accessibleProjects.map((project) => project._id);

    const tasks = await Task.find({
      $or: [
        { user: req.userId, projectId: null },
        { projectId: { $in: projectIds } },
      ],
    })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Could not load tasks." });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      title,
      project,
      projectId,
      assignedTo,
      date,
      priority,
      status,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required.",
      });
    }

    const allowedPriorities = ["Low", "Medium", "High"];
    const allowedStatuses = ["To do", "In progress", "Done"];

    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority." });
    }

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid task status." });
    }

    
    if (!projectId) {
      const task = await Task.create({
        title: title.trim(),
        project: project || "Website Redesign",
        date: date || "Today",
        priority: priority || "Medium",
        status: status || "To do",
        user: req.userId,
      });

   

      return res.status(201).json({ task });
    }

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const selectedProject = await Project.findOne({
      _id: projectId,
      $or: [{ user: req.userId }, { members: req.userId }],
    });

    if (!selectedProject) {
      return res.status(403).json({
        message: "You do not have access to this project.",
      });
    }

    let assigneeId = null;

    if (assignedTo) {
      if (!mongoose.isValidObjectId(assignedTo)) {
        return res.status(400).json({ message: "Invalid assignee ID." });
      }

      const isProjectMember =
        selectedProject.members.some(
          (memberId) => memberId.toString() === assignedTo
        ) ||
        selectedProject.user.toString() === assignedTo;

      if (!isProjectMember) {
        return res.status(400).json({
          message: "Assignee must belong to this project.",
        });
      }

      assigneeId = assignedTo;
    }

   const task = await Task.create({
  title: title.trim(),
  project: selectedProject.name,
  projectId: selectedProject._id,
  assignedTo: assigneeId,
  date: date || "Today",
  priority: priority || "Medium",
  status: status || "To do",
  user: req.userId,
});

if (
  assigneeId &&
  assigneeId.toString() !== req.userId.toString()
) {
  await Notification.create({
    user: assigneeId,
    message: `You have been assigned a new task: ${task.title}`,
    type: "task_assigned",
    task: task._id,
  });
}

res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Could not create task." });
  }
});


router.patch("/:id", authenticate, async (req, res) => {
  try {
    const { status } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    if (!["To do", "In progress", "Done"].includes(status)) {
      return res.status(400).json({ message: "Invalid task status." });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    
    if (!task.projectId) {
      if (task.user.toString() !== req.userId.toString()) {
        return res.status(403).json({
          message: "You cannot update this task.",
        });
      }
    } else {
      
      const project = await Project.findOne({
        _id: task.projectId,
        $or: [{ user: req.userId }, { members: req.userId }],
      });

      if (!project) {
        return res.status(403).json({
          message: "You do not have access to this project.",
        });
      }

      
const isAssignee =
  task.assignedTo &&
  task.assignedTo.toString() === req.userId.toString();

if (!isAssignee) {
  return res.status(403).json({
    message: "Only the assigned member can update this task.",
  });
}
 }

    const previousStatus = task.status;

task.status = status;
await task.save();

if (previousStatus !== status && task.user.toString() !== req.userId.toString()) {
  await Notification.create({
    user: task.user,
    message: `Task "${task.title}" status changed from ${previousStatus} to ${status}.`,
    type: "task_updated",
    task: task._id,
  });
}

res.json({ task });
  } catch (error) {
    res.status(500).json({ message: "Could not update task." });
  }
});


router.post("/:id/timer/start", authenticate, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    
    if (!task.projectId) {
      if (task.user.toString() !== req.userId.toString()) {
        return res.status(403).json({
          message: "You cannot track time for this task.",
        });
      }
    } else {
      const project = await Project.findOne({
        _id: task.projectId,
        $or: [{ user: req.userId }, { members: req.userId }],
      });

      if (!project) {
        return res.status(403).json({
          message: "You do not have access to this project.",
        });
      }

      const isAssignee =
        task.assignedTo &&
        task.assignedTo.toString() === req.userId.toString();

      const isOwner =
        project.user.toString() === req.userId.toString();

      if (!isAssignee && !isOwner) {
        return res.status(403).json({
          message: "Only the assigned member or project owner can track this task.",
        });
      }
    }

    if (task.status === "Done") {
      return res.status(400).json({
        message: "Completed tasks cannot start a timer.",
      });
    }

    
    const runningTasks = await Task.find({
      timerStartedAt: { $ne: null },
      $or: [
        { user: req.userId },
        { assignedTo: req.userId },
      ],
      _id: { $ne: task._id },
    });

    for (const runningTask of runningTasks) {
      const elapsedSeconds = Math.max(
        0,
        Math.floor(
          (Date.now() - new Date(runningTask.timerStartedAt).getTime()) /
            1000
        )
      );

      runningTask.trackedSeconds =
        (runningTask.trackedSeconds || 0) + elapsedSeconds;

      runningTask.timerStartedAt = null;
      await runningTask.save();
    }

    if (!task.timerStartedAt) {
      task.timerStartedAt = new Date();
      await task.save();
    }

    res.json({
      message: "Timer started.",
      task,
    });
  } catch (error) {
    console.error("Start timer error:", error);
    res.status(500).json({ message: "Could not start timer." });
  }
});



router.post("/:id/timer/stop", authenticate, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (!task.projectId) {
      if (task.user.toString() !== req.userId.toString()) {
        return res.status(403).json({
          message: "You cannot track time for this task.",
        });
      }
    } else {
      const project = await Project.findOne({
        _id: task.projectId,
        $or: [{ user: req.userId }, { members: req.userId }],
      });

      if (!project) {
        return res.status(403).json({
          message: "You do not have access to this project.",
        });
      }

      const isAssignee =
        task.assignedTo &&
        task.assignedTo.toString() === req.userId.toString();

      const isOwner =
        project.user.toString() === req.userId.toString();

      if (!isAssignee && !isOwner) {
        return res.status(403).json({
          message: "Only the assigned member or project owner can track this task.",
        });
      }
    }

    if (!task.timerStartedAt) {
      return res.status(400).json({
        message: "This task's timer is not running.",
      });
    }

    const elapsedSeconds = Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(task.timerStartedAt).getTime()) / 1000
      )
    );

    task.trackedSeconds = (task.trackedSeconds || 0) + elapsedSeconds;
    task.timerStartedAt = null;

    await task.save();

    res.json({
      message: "Timer stopped.",
      task,
    });
  } catch (error) {
    console.error("Stop timer error:", error);
    res.status(500).json({ message: "Could not stop timer." });
  }
});


router.delete("/:id", authenticate, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    
    if (!task.projectId) {
      if (task.user.toString() !== req.userId.toString()) {
        return res.status(403).json({
          message: "You cannot delete this task.",
        });
      }
    } else {
      const project = await Project.findOne({
        _id: task.projectId,
        user: req.userId,
      });

      if (!project) {
        return res.status(403).json({
          message: "Only the project owner can delete this task.",
        });
      }
    }

    await Task.findByIdAndDelete(task._id);

    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete task." });
  }
});


module.exports = router;
