const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskText: { type: String, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
