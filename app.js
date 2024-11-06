const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');  // Import the User model
const authRoutes = require('./routes/auth');  // Import the auth routes
const taskRoutes = require('./routes/tasks');  // Import the tasks routes

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Serve static files from the "public" directory (e.g., client.js, styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: false }));

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', authRoutes);  // Existing auth routes
app.use('/', taskRoutes);   // Use the task routes


// Configure Passport LocalStrategy for username/password authentication
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'User not found' });
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });
        
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Serve the main page or redirect based on authentication
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/tasks'); // Redirect to tasks if authenticated
    }
    res.render('login'); // Render login if not authenticated
});

// Protect Routes with Authentication Middleware
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');  // Redirect to login if not authenticated
}

// Example: Protect your tasks route
app.get('/tasks', isAuthenticated, (req, res) => {
    // Fetch and display user's tasks
    res.send('This is your task list.'); // Placeholder response
});

// Use the auth routes
app.use('/', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
