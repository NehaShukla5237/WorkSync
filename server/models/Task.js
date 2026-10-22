const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    project: {
      type: String,
      default: "Website Redesign",
    },

    projectId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Project",
       default: null,
       index: true,
    },

    assignedTo: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       default: null,
       index: true,
    },

    date: {
      type: String,
      default: "Today",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["To do", "In progress", "Done"],
      default: "To do",
    },

    trackedSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },

    
    timerStartedAt: {
      type: Date,
      default: null,
    },


    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
