// Require modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const router = express.Router();
const mysql = require("mysql");

// middleware specific to this router

// DB variables

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Open connection to DB
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database: ", path.basename(__filename));
});



// define the home page route 

// define the Product route
router.get('/:productID', (req, res) => {
  const productId = req.params.productID;

  connection.query('SELECT Product.productID, Product.naam, Product.aantalBeschikbaar, Product.afbeelding, Product.specificaties, Product.voorwaarde FROM Product WHERE productID = ?', [productId], (err, result) => {
    if (err) {
      console.error('Fout bij uitvoeren query: ' + err.stack);
      return;
    }
    //console.log(result[0]);
    res.render('product', { product: result[0] }); 
  });
});

module.exports = router;