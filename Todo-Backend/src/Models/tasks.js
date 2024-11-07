const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taksSchema = new schema({
  taskName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  deadlineDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Todo", "In Progress", "In Review", "Completed"],
    required: true,
  },
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  pid: {
    type: String,
    required: true,
  },
});

const taskModel = mongoose.model("tasks", taksSchema);
module.exports = { taksSchema, taskModel };
