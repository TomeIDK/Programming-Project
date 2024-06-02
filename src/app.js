// Require modules
require("dotenv").config();
require('dotenv');
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const DBService = require("./dbService");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const checkRole = require('./middleware/role-auth');

// Create Express app
const app = express();

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Global middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(checkRole());

const dbService = new DBService();

// Routes
const login = require('./routes/login');
const logout = require ("./routes/logout");
const info = require("./routes/info");
const catalog = require("./routes/catalog");
const api = require("./routes/api");
const product = require("./routes/product");
const uitleenmandje = require('./routes/uitleenmandje');
const sessionData = require('./routes/session-data');
const reserveren = require('./routes/reserveren');
const getBasketCount = require('./routes/get-basket-count');
const reservations = require ("./routes/reservaties");
const mijnUitleengeschiedenis = require("./routes/mijn-uitleengeschiedenis");
const admin = require ("./routes/admin");
const notFound = require("./routes/not-found");



app.use("/login", login);
app.use("/", login);
app.use("/logout", logout);
app.use("/info", info); 
app.use("/cataloog", catalog);
app.use("/api", api);
app.use("/product", product);
app.use("/uitleenmandje", uitleenmandje);
app.use("/session-data", sessionData);
app.use("/reserveren", reserveren);
app.use("/get-basket-count", getBasketCount);
app.use("/reservaties", reservations);
app.use("/mijn-uitleengeschiedenis", mijnUitleengeschiedenis);
app.use("/admin", admin);
app.use("/not-found", notFound);




// Set up view engine and static files
app.set("view engine", "ejs");

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
