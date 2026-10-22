const User = require("../models/User");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Project = require("../models/Project");

const router = express.Router();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId || decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
}


router.get("/", authenticate, async (req, res) => {
  try {
    
const projects = await Project.find({
  $or: [
    { user: req.userId },
    { members: req.userId },
  ],
})
  .populate("user", "name email")
  .populate("members", "name email")
  .sort({ createdAt: -1 });


    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects.",
    });
  }
});


router.get("/users/search", authenticate, async (req, res) => {
  try {
    const email = (req.query.email || "").trim().toLowerCase();

    if (!email || email.length < 3) {
      return res.status(400).json({
        message: "Enter at least 3 characters of an email.",
      });
    }

    const users = await User.find({
      email: { $regex: email, $options: "i" },
      _id: { $ne: req.userId },
    })
      .select("name email")
      .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search users.",
    });
  }
});


router.post("/", authenticate, async (req, res) => {
  try {
    const { name, description, color, dueDate } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Project name is required.",
      });
    }

    if (color && !["purple", "blue", "green"].includes(color)) {
      return res.status(400).json({
        message: "Invalid project color.",
      });
    }

    let parsedDueDate = null;

    if (dueDate) {
      parsedDueDate = new Date(dueDate);

      if (Number.isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({
          message: "Invalid due date.",
        });
      }
    }

    const project = await Project.create({
      name: name.trim(),
      description: description || "",
      color: color || "purple",
      dueDate: parsedDueDate,
      user: req.userId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project.",
    });
  }
});

 
router.post("/:id/members", authenticate, async (req, res) => {
  try {
    const { email } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "User email is required.",
      });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or you are not the owner.",
      });
    }

    const member = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("name email");

    if (!member) {
      return res.status(404).json({
        message: "No registered user found with this email.",
      });
    }

    if (member._id.toString() === req.userId.toString()) {
      return res.status(400).json({
        message: "You are already the project owner.",
      });
    }

    if (project.members.some(
      (id) => id.toString() === member._id.toString()
    )) {
      return res.status(409).json({
        message: "This user is already a project member.",
      });
    }

    project.members.push(member._id);
    await project.save();

    res.status(200).json({
      message: "Project member added successfully.",
      member,
      projectId: project._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add project member.",
    });
  }
});


router.delete("/:id/members/:memberId", authenticate, async (req, res) => {
  try {
    const { id, memberId } = req.params;

    if (
      !mongoose.isValidObjectId(id) ||
      !mongoose.isValidObjectId(memberId)
    ) {
      return res.status(400).json({
        message: "Invalid project or member ID.",
      });
    }

    const project = await Project.findOne({
      _id: id,
      user: req.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or you are not the owner.",
      });
    }

    const isMember = project.members.some(
      (member) => member.toString() === memberId
    );

    if (!isMember) {
      return res.status(404).json({
        message: "Member not found in this project.",
      });
    }

    project.members = project.members.filter(
      (member) => member.toString() !== memberId
    );

    await project.save();

    res.json({
      message: "Member removed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove project member.",
    });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    res.json({
      message: "Project deleted successfully.",
      projectId: project._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete project.",
    });
  }
});

module.exports = router;
