const express = require('express');
const Task = require('../models/Task'); // Adjust the path as necessary
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth'); // Middleware to check authentication

// Get all tasks for the authenticated user
router.get('/tasks', isAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.render('tasks', { tasks }); // Render tasks view with the tasks data
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new task
router.post('/tasks', isAuthenticated, async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const task = new Task({ title, description, dueDate, userId: req.user.id });
        await task.save();
        res.redirect('/tasks'); // Redirect to tasks after creating a new one
    } catch (err) {
        res.status(400).send('Error creating task');
    }
});

module.exports = router;
