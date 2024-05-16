const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// middleware specific to this router

// Define route handler function and render response with necessary data
router.get("/", (req, res) => {
  const sessionData = {
    userID: req.session.userID || null,
    artikelID: req.session.artikelID || null, // Voeg artikelID toe aan de sessie
    reden: req.session.reden || null, // Voeg reden toe aan de sessie
    UitleenmandjeID: req.session.UitleenmandjeID || null
  };
  res.json(sessionData);
});

module.exports = router;
