import mysql from'mysql';
// import express from 'express';
// import path from 'path';
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
// const mysql = require("mysql");

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
      host: "", // Change this to your MySQL host
      user: "2324PROGPRGR10", // Your MySQL username
      password: "hVWX33SX", // Your MySQL password
      database: "2324PROGPRGR10", // Your database name
    })
    .promise();

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database");
  });
});
