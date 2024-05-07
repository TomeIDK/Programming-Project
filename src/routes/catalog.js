// Require modules
require("dotenv").config();
const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require("mysql");

// middleware specific to this router

// define the home page route
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "..", 'public', 'cataloog.html'));
// });

// DB variables
const namen = [];

// Database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Open connection to DB
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Retrieve "naam" from User table
connection.query('SELECT naam from User', (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }

    // Log query results
    console.log('Retrieved users:', results);

    // Map attributes to new array
    namen = results.map(user => user.naam);
    console.log('Namen:', namen);

    // Close DB connection
    connection.end();
})

router.get('/', (req, res) => {
    const users = namen;
    
    // Test data while I can't connect to DB
    const testUsers = ['Cedric', 'Adrien', 'Nehad', 'Giles', 'Milad', 'Soulaymane'];
    console.log('Names:', testUsers);
    res.render('cataloog', { testUsers: testUsers });
})



module.exports = router;
