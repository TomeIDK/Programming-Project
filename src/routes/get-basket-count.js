const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbService = require("../dbService");

// middleware specific to this router

// Define route handler function and render response with necessary data
router.get("/", (req, res) => {
  let dbServiceInstance = new dbService();
  dbServiceInstance.getBasketItemsCount(
    req.session.user.UitleenmandjeID,
    req.session.user.userID,
    (err, result) => {
      if (err) {
        console.error(
          "Kan aantal producten in uitleenmandje niet ophalen: ",
          err
        );
        res.json(-1);
      } else {
        console.log("Aantal producten in uitleenmandje opgehaald");
        res.json(result);
      }
    }
  );
});

module.exports = router;
