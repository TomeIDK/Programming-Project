const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

// middleware specific to this router

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Define route handler function and render response with necessary data
router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { email, pass } = req.body;

  connection.query(
    `SELECT User.userID, User.userType, User.wachtwoord, User.email, Uitleenmandje.UitleenmandjeID 
    FROM User 
    LEFT JOIN Uitleenmandje ON User.userID = Uitleenmandje.userID 
    WHERE User.email='${email}'`,
    (err, result) => {
      if (err) {
        return res.status(500).send("Internal server error");
      }

      if (result.length === 0) {
        return res.status(401).send("User not found");
      }

      const {
        userID: userID,
        userType: userType,
        email: userEmail,
        wachtwoord: pass_hash,
        UitleenmandjeID: UitleenmandjeID,
      } = result[0];

      bcrypt.compare(pass, pass_hash, (error, areMatching) => {
        if (error) {
          return res.status(500).send("Error authenticating user.");
        }

        if (areMatching) {
          const user = {
            userID: userID,
            type: userType,
            email: email,
            UitleenmandjeID: UitleenmandjeID,
          };
          req.session.user = user;
          return res
            .status(200)
            .json({ message: "Login successful" });
        } else {
          return res.status(401).send("Invalid email or password");
        }
      });
    }
  );
});

module.exports = router;
