const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    readBy: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
    },
   ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
