const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});

app.get('/cataloog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cataloog.html'));
});

app.get('/product/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cataloog.html'));
});

app.get('/uitleenmandje/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'uitleenmandje.html'));
});

app.get('/uitleningen/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'uitleningen.html'));
});

app.get('/reservaties/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reservaties.html'));
});

app.get('/geschiedenis/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'geschiedenis.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  const connection = mysql
    .createConnection({
      host: "dt5.ehb.be", // Change this to your MySQL host
      user: "2324PROGPRGR10", // Your MySQL username
      password: "hVWX33SX", // Your MySQL password
      database: "2324PROGPRGR10", // Your database name
    });
   
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database");
  });

  const resultArray = [];
  const cursor =connection.query("SELECT * FROM Product");

  cursor.on("result",(row) =>{
    const existingRow = resultArray.find(existingRow => existingRow.ProductID === row.ProductID);
    resultArray.push(row);
  });

  cursor.on("error",(err) =>{
   console.error('error executing query: ', err);
  });

  cursor.on("end", () => {
    connection.end();
    console.log("Query execution complete");
    console.log("reult array: ", resultArray);
    
  });

  app.set("view engine" , "ejs");
  app.use (express.static(path.join(__dirname, "public")));

  app.get ("/Product", (req, res) =>{
    res.json(resultArray);
  });

  app.listen(3000, () => {
    console.log("Server is running")
  })

});