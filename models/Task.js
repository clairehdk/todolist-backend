const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  title: String,
  isDone: Boolean,
});

module.exports = Task;
