const express = require('express');
const passport = require('passport');
const User = require('../models/User');  // Import the User model
const router = express.Router();

// Serve the signup page
router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup view
});

// Sign up route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');  // Redirect to login page after signup
    } catch (err) {
        res.status(400).send('Error creating user');
    }
});

// Serve the login page
router.get('/login', (req, res) => {
    res.render('login'); // Render the login view
});

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/tasks',  // Redirect to tasks after successful login
    failureRedirect: '/login',    // Redirect back to login page on failure
    failureFlash: true
}));

// Handle logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');  // Redirect to homepage after logout
    });
});

module.exports = router;
