// In je retourbeheer.js of een andere router file
const express = require("express");
const router = express.Router();
const mysql = require("mysql");

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
  console.log("verbonden met DB: retourbeheer.js");
});

router.get("/", (req, res) => {
    connection.query(`
      SELECT Product.afbeelding, Product.naam, Product.productID
      FROM Product`, 
      
      (err, results) => {
      if (err) {
          console.error("Error fetching product data: ", err);
          return res.status(500).json({ error: "Database error" });
      }
  
      console.log("Product data:", results);
  
      if (results.length > 0) {
          res.render("admin-retourbeheer", { product: results });
      } else {
          res.status(404).render("admin-retourbeheer", { error: "Product not found" });
      }
  });
  });
  
  module.exports = router;
  



/*
  connection.query(
    `
    SELECT User.userID, User.naam AS gebruikersNaam, User.voornaam, Uitlening.startDatum, Uitlening.eindDatum, Product.naam AS productNaam, Product.afbeelding AS productAfbeelding
    FROM User
    JOIN Uitlening ON User.userID = Uitlening.userID
    JOIN product ON Uitlening.productID = Product.productID
    WHERE Artikel.artikelID= '${artikelID}'`,
    (err, result) => {
        console.log('result:', result);
      if (err) {
        console.error("Fout bij uitvoeren query: " + err.stack);
      } else {
        res.render("admin-retourbeheer", { result: result });
      }
    }
  );

*/