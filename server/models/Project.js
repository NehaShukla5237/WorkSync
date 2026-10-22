const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    color: {
      type: String,
      enum: ["purple", "blue", "green"],
      default: "purple",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    
    members: [
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     },
   ],

  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
