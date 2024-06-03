// routes/reservaties.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const DBService = require("../dbService");
let dbServiceInstance = new DBService();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Open connection to DB
connection.connect((err) => {
  if (err) {
    console.error("fout bij verbinden met DB: ", err);
    return;
  }
  console.log("verbonden met DB");
});

router.get("/", (req, res) => {
  const userID = req.session.user.userID;
  connection.query(
    `SELECT U.uitleningID, U.startDatum, U.eindDatum, P.naam AS productNaam
         FROM Uitlening U
         JOIN Artikel A ON U.artikelID = A.artikelID
         JOIN Product P ON A.productID = P.productID
         WHERE U.userID = ?`,
    [userID],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .send(
            "Er is een fout opgetreden bij het ophalen van de reservaties."
          );
        return;
      }
      res.render("reservaties", { reservations: results });
    }
  );
});

router.delete("/", (req, res) => {
  dbServiceInstance.cancelReservation(req.body.uitleningID, (error, result) => {
    if (error) {
      console.error("Kan reservatie niet annuleren: ", error);
      res.status(400).send("Kan reservatie niet annuleren");
      return;
    } else {
      res.status(200).send("Reservatie succesvol geannuleerd");
    }
  });
});

module.exports = router;
