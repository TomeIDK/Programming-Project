// Require modules
require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const DBService = require("./dbService");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// Create Express app
const app = express();

// Global middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
const dbService = new DBService();

// Routes
const login = require('./routes/login');
const info = require("./routes/info");
const catalog = require("./routes/catalog");
const api = require("./routes/api");
const product = require("./routes/product");
const uitleenmandje = require('./routes/uitleenmandje');

app.use("/login", login);
app.use("/", login);
app.use("/info", info);
app.use("/cataloog", catalog);
app.use("/api", api);
app.use("/product", product);
app.use("/uitleenmandje", uitleenmandje);

// Set up view engine and static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// API routes
// Get all products
app.get("/api/products", (req, res) => {
  connection.query("SELECT * FROM Product", (err, result) => {
    if (err) {
      console.error("Error fetching products: ", err);
      res.status(500).json({ error: "Failed to fetch products" });
    } else {
      res.json(result);
    }
  });
});

// Handle reservation
app.post("/api/uitleningen", (req, res) => {
  const { productId, userId, startDatum, reden } = req.body;
  dbService.addUitlening(
    productId,
    userId,
    startDatum,
    reden,
    (err, result) => {
      if (err) {
        console.error("Error adding uitlening to database: ", err);
        res.status(500).json({ error: "Failed to add uitlening" });
      } else {
        console.log("Uitlening added successfully");
        res.status(200).json({ message: "Uitlening added successfully" });
      }
    }
  );
});

// Handle number available
app.get("/api/products/availability", (req, res) => {
  dbService.getProductAvailability((err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch product availability" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
