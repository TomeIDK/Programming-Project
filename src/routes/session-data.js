const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// middleware specific to this router

// Define route handler function and render response with necessary data
router.get("/", (req, res) => {
  const sessionData = req.session.user;
  res.json(sessionData);
});

module.exports = router;
