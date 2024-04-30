<<<<<<< Updated upstream
<<<<<<< Updated upstream
const mysql = require('mysql');
=======
const mysql = require("mysql");
// import express from 'express';
// import path from 'path';
>>>>>>> Stashed changes
const express = require("express");
=======
const mysql= require('mysql');
const express = require('express');
>>>>>>> Stashed changes
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});

app.get('/cataloog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cataloog.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  const connection = mysql
    .createConnection({
      host: "dt5.ehb.be", // Change this to your MySQL host
      user: "2324PROGPRGR10", // Your MySQL username
      password: "hVWX33SX", // Your MySQL password
      database: "dt5.ehb.be", // Your database name
    }).promise();

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database");
  });
});
