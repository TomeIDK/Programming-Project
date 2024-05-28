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
    console.log("verbonden met DB: admin.js");
  });


// define the home page route

router.get("/dashboard", (req, res) => {
    const today = new Date();
  
    connection.query(`
      
      SELECT Uitlening.startDatum, Uitlening.eindDatum 
      FROM Uitlening `,
      (err, result) => {
        if (err) {
          console.error('Fout bij uitvoeren query: ' + err.stack);
          return;
        } else {  
          let onTime = 0;
          let lastDay = 0;
          let late = 0;
  
          result.forEach(item => {
            const endDate = new Date(item.eindDatum);
            const daysDiff = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
  
            if (daysDiff > 1) {
              onTime += 1;
            } else if (daysDiff === 1) {
              lastDay += 1;
            } else {
              late += 1;
            }
          });
  
          res.render("admin-dashboard", {
            onTime: onTime,
            lastDay: lastDay,
            late: late
          });
        }
      }
    );
  });
  
  module.exports = router;

module.exports = router;

router.get("/dashboard", (req, res) => {
    res.render("admin-dashboard", {  });
});

router.get("/retourbeheer", (req, res) => {
    res.render("admin-retourbeheer", {  });
});


router.get("/retourbeheer/:UitleningID", (req, res) => {
    res.render("admin-retourbeheer-uitlening", {  });
});

module.exports = router;
