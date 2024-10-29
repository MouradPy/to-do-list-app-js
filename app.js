const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" directory (e.g., client.js, styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve the main page
app.get('/', (req, res) => {
    res.render('index'); // This serves index.ejs
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});



//Connect to MongoDB in Your App
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB');

