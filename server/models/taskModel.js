const mongoose = require("mongoose");

const tasksSchema = {
    text: String,
    day: String,
    reminder: Boolean,
}

const Task = mongoose.model("Task", tasksSchema);

module.exports = Task;