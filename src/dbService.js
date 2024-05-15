const mysql = require("mysql");
const dotenv = require("dotenv");
const uuid = require("uuid");

dotenv.config();

class DBService {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error("Error connecting to database: " + err.stack);
        console.error("\nBen je geconnecteerd met het schoolnetwerk? (VPN)");
        return;
      }
      console.log("Connected to database");
    });
  }

  addUitlening(productId, userId, startDatum, reden, callback) {
    const uitleningID = uuid.v4().substring(0, 9); // Genereer een unieke uitleningID

    this.connection.query(
      "INSERT INTO Uitleningen (UitleningID, ProductID, UserID, StartDatum, Reden) VALUES (?, ?, ?, ?, ?)",
      [uitleningID, productId, userId, startDatum, reden],
      (err, result) => {
        if (err) {
          console.error("Error adding uitlening to database: ", err);
          callback(err, null);
        } else {
          console.log("Uitlening added successfully");
          callback(null, result);
        }
      }
    );
  }

  getProductAvailability(callback) {
    this.connection.query(
      "SELECT ProductID, COUNT(*) AS availability FROM Reservations GROUP BY ProductID",
      (err, result) => {
        if (err) {
          console.error(
            "Error fetching product availability from database: ",
            err
          );
          callback(err, null);
        } else {
          console.log("Product availability fetched successfully");
          callback(null, result);
        }
      }
    );
  }

  createBasketItem(uitleenmandjeID, userID, productID, amount, callback) {
    // let now = new Date();
    // now = now.toISOString().slice(0, 19).replace("T", " ");
    // console.log(uitleenmandjeID, userID, productID, amount, now);
    // Insert basket item if no basket exists for user yet
    if (uitleenmandjeID === undefined) {
      this.connection.query(
        `INSERT INTO Uitleenmandje (userID, productID, aantal)
        VALUES (${userID}, ${productID}, ${amount})`,
        (err, result) => {
          if (err) {
            console.error("Error creating new lending basket: ", err);
            callback(err, null);
          } else {
            console.log("Lending basket item created succesfully");
            callback(null, true);
          }
        }
      );
    } else {
      // Insert basket item if basket already exists for user
      this.connection.query(
        `INSERT INTO Uitleenmandje (UitleenmandjeID, userID, productID, aantal)
        VALUES (${uitleenmandjeID}, ${userID}, ${productID}, ${amount})`,
        (err, result) => {
          if (err) {
            console.error("Error creating lending basket: ", err);
            callback(err, null);
          } else {
            console.log("Lending basket created succesfully");
            callback(null, result);
          }
        }
      );
    }
  }

  getUserUitleenmandjeID(userID, callback) {
    this.connection.query(
      `SELECT UitleenmandjeID FROM Uitleenmandje WHERE userID = ${userID} LIMIT 1`,
      (err, result) => {
        if (err) {
          console.error(
            "Kan UitleenmandjeID niet ophalen uit database: ",
            err
          );
          callback(err, null);
        } else {
          console.log("UitleenmandjeID succesvol opgehaald");
          callback(null, result);
        }
      }
    );
  }
}

module.exports = DBService;
