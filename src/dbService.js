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

  addReservation(userId, artikelId, reden, startDatum, eindDatum) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO Uitleening (userID, artikelID, reden, startDatum, eindDatum, isVerlengd, isBeschadigd, isUitgeleend) VALUES (?, ?, ?, ?, ?, 0, 0, 0)";
      this.connection.query(query, [userId, artikelId, reden, startDatum, eindDatum], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  createBasketItem(uitleenmandjeID, userID, productID, aantal, callback) {
    let now = new Date();
    now = now.toISOString().slice(0, 19).replace("T", " ");
    // Insert basket item if no basket exists for user yet
    if (!uitleenmandjeID) {
      this.connection.query(
        `INSERT INTO Uitleenmandje (userID, productID, aantal, gemaaktOp)
        VALUES (${userID}, ${productID}, ${aantal}, '${now}')`,
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
    } else {
      // Insert basket item if basket already exists for user
      this.connection.query(
        `INSERT INTO Uitleenmandje (UitleenmandjeID, userID, productID, aantal, gemaaktOp)
        VALUES (${uitleenmandjeID}, ${userID}, ${productID}, ${aantal}, '${now}')`,
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
}

module.exports = DBService;
