
const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const dbService = require("../dbService");

// middleware specific to this router


// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err)=>{
  if (err){
    console.error ("fout bij verbinden met DB: ", err);
    return;
  }
  console.log("verbonden met DB");
});

// Define route handler function and render response with necessary data   WHERE Uitleenmandje.UitleenmandjeID = ?, [UitleenmandjeID],
router.get("/:uitleenmandjeID", (req, res) => {
  const UitleenmandjeID = req.params.uitleenmandjeID;

  connection.query
  (`SELECT Product.productID, Product.afbeelding, Product.naam 
    FROM Product 
    LEFT JOIN Uitleenmandje ON Product.productID = Uitleenmandje.productID 
    WHERE Uitleenmandje.UitleenmandjeID = '${UitleenmandjeID}'`,
     (err, result) => {
      console.log("result:", result);
      if (err) {
        console.error('Fout bij uitvoeren query: ' + err.stack);
        
      } else {  
       // console.log("product: " , result[0]);
      

      const hasProducts = result.length > 0;
      const pageTitle = hasProducts ? 'Uitleenmandje' : ' geen producten in het uitleenmandje gevonden. '
      res.render("uitleenmandje", { products: result, pageTitle: pageTitle }); 
    }
       
     //const product = result.lenght > 0 ? result[0]: { naam: "Unknown" }; ;
       
  }); 
});

router.post("/delete", (req, res) => {
  let user = req.session.user;
  const productID = req.body.productID;

  dbServiceInstance = new dbService();
  dbServiceInstance.removeBasketItem(user.UitleenmandjeID, user.userID, productID, (err, result) => {
    if (err) {
      console.log("failed post");
      res.status(401).send("Kan product niet uit uitleenmandje verwijderen");
    } else {
      console.log("success post");

      res.status(200).send("Product verwijdert uit uitleenmandje");
    }

  });
});
module.exports = router;

