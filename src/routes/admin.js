const express = require("express");
const router = express.Router();
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

connection.connect((err) => {
  if (err) {
    console.error("fout bij verbinden met DB: ", err);
    return;
  }
  console.log("verbonden met DB: admin.js");
});

// define the home page route

router.get("/dashboard", (req, res) => {
  const today = new Date();

  connection.query(
    `
      
      SELECT Uitlening.startDatum, Uitlening.eindDatum 
      FROM Uitlening `,
    (err, result) => {
      if (err) {
        console.error("Fout bij uitvoeren query: " + err.stack);
        return;
      } else {
        let onTime = 0;
        let lastDay = 0;
        let late = 0;

        result.forEach((item) => {
          const endDate = new Date(item.eindDatum);
          const daysDiff = Math.floor(
            (endDate - today) / (1000 * 60 * 60 * 24)
          );

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
          late: late,
        });
      }
    }
  );
});

router.get("/dashboard", (req, res) => {
  res.render("admin-dashboard", {});
});

router.get("/retourbeheer", (req, res) => {
  res.render("admin-retourbeheer");
});

router.get("/retourbeheer/:uitleningID", async (req, res) => {
  const dbServiceInstance = new dbService();
  let data;
  let product;
  dbServiceInstance.getUitlening(req.params.uitleningID, (error, result) => {
    if (error) {
      console.error("Fout bij uitvoeren query: " + err.stack);
      return;
    } else {
      data = result[0];
      dbServiceInstance.getProductByArticleId(data.artikelID, (err, results) => {
        if (err) {
          console.error("Fout bij uitvoeren query: " + err.stack);
          return;
        } else {
          product = results[0];
          console.log(data);
          console.log(product);
          res.render("admin-retourbeheer-uitlening", { data: data, product: product });
        }
      });
    }
  });

});

// POST Request for when Admin searches for an Uitlening by artikelID on /admin/retourbeheer
router.post("/retourbeheer", (req, res) => {
  const dbServiceInstance = new dbService();
  let artikelID;
  if (req.body.artikelID === undefined) {
    artikelID = 1;
  } else {
    artikelID = req.body.artikelID;
  }

  dbServiceInstance.getProductByArticleId(artikelID, (error, result) => {
    if (error) {
      console.error("Fout bij uitvoeren query: " + err.stack);
      return;
    } else if (result.length > 0) {
      console.log(result);
      dbServiceInstance.getUitleningenByArticleId(artikelID, (err, results) => {
        if (err) {
          console.error("Fout bij uitvoeren query: " + err.stack);
          return;
        } else {
          res.status(200).send({ product: result[0], uitleningen: results });
        }
      });
    } else {
      res.status(404).send("Artikel niet gevonden");
    }
  });
});

router.post("/retourbeheer/:uitleningID", async (req, res) => {
  const dbServiceInstance = new dbService();

  dbServiceInstance.returnUitlening(req.params.uitleningID, req.body.isBeschadigd, (error, result) => {
    if (error) {
      console.error("Fout bij uitvoeren query: " + err.stack);
      res.status(400).send("Kan uitlening niet terugbrengen");
    } else {
      res.status(200).send("Uitlening teruggebracht");
    }
  });
});

module.exports = router;
