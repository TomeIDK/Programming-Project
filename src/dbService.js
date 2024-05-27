const mysql = require("mysql");
const dotenv = require("dotenv");

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

    this.connection.on("error", function (err) {
      console.error("Database error:", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        // Reconnect when connection is lost
        this.connection.connect((err) => {
          if (err) {
            console.error("Error reconnecting to database: " + err.stack);
          } else {
            console.log("Reconnected to database");
          }
        });
      } else {
        throw err;
      }
    });
  }

  addReservation(userID, artikelID, reden, startDatum, eindDatum, callback) {
    this.connection.query(
      `INSERT INTO Uitlening (userID, artikelID, reden, startDatum, eindDatum, isVerlengd, inleverDatum, isBeschadigd, isUitgeleend)
      VALUES (${userID}, ${artikelID}, '${reden}', '${startDatum}', '${eindDatum}', 0, null, 0, 0)`,
      (err, result) => {
        if (err) {
          console.error("Kan reservatie niet toevoegen: ", err);
          callback(err, null);
        } else {
          console.log("Reservatie succesvol toegevoegd");
          callback(null, result);
        }
      }
    );
  }

  createBasketItem(uitleenmandjeID, userID, productID, amount, callback) {
    this.connection.query(
      `SELECT * FROM Uitleenmandje WHERE UitleenmandjeID = ${uitleenmandjeID} AND userID = ${userID} AND productID = ${productID}`,
      (err, result) => {
        if (err) {
          console.error("Error checking if item exists in basket: ", err);
          callback(err, null);
        } else {
          if (result.length > 0) {
            const currentQuantity = result[0].aantal;
            const newQuantity = currentQuantity + amount;
            this.connection.query(
              `UPDATE Uitleenmandje SET aantal = ${newQuantity} WHERE UitleenmandjeID = ${uitleenmandjeID} AND userID = ${userID} AND productID = ${productID}`,
              (updateErr, updateResult) => {
                if (updateErr) {
                  console.error(
                    "Error updating basket item quantity: ",
                    updateErr
                  );
                  callback(updateErr, null);
                } else {
                  console.log("Basket item quantity updated successfully");
                  callback(null, updateResult);
                }
              }
            );
          } else {
            this.connection.query(
              `INSERT INTO Uitleenmandje (UitleenmandjeID, userID, productID, aantal) VALUES (${uitleenmandjeID}, ${userID}, ${productID}, ${amount})`,
              (insertErr, insertResult) => {
                if (insertErr) {
                  console.error("Error creating new basket item: ", insertErr);
                  callback(insertErr, null);
                } else {
                  console.log("New basket item created successfully");
                  callback(null, insertResult);
                }
              }
            );
          }
        }
      }
    );
  }

  getUserUitleenmandjeID(userID, callback) {
    this.connection.query(
      `SELECT UitleenmandjeID FROM Uitleenmandje WHERE userID = ${userID} LIMIT 1`,
      (err, result) => {
        if (err) {
          console.error("Kan UitleenmandjeID niet ophalen uit database: ", err);
          callback(err, null);
        } else {
          console.log("UitleenmandjeID succesvol opgehaald");
          callback(null, result);
        }
      }
    );
  }

  removeBasketItem(UitleenmandjeID, userID, productID, callback) {
    this.connection.query(
      `DELETE FROM Uitleenmandje WHERE UitleenmandjeID = ${UitleenmandjeID} AND userID = ${userID} AND productID = ${productID}`,
      (err, result) => {
        if (err) {
          console.log("failed db");

          console.error("Kan item niet verwijderen uit uitleenmandje: ", err);
          callback(err, null);
        } else {
          console.log("Item succesvol verwijdert uit uitleenmandje");
          callback(null, result);
        }
      }
    );
  }

  getBasketItemsCount(UitleenmandjeID, userID, callback) {
    this.connection.query(
      `SELECT COUNT(*) AS count FROM Uitleenmandje WHERE UitleenmandjeID = ${UitleenmandjeID} AND userID = ${userID}`,
      (err, result) => {
        if (err) {
          console.error(
            "Kan aantal producten in uitleenmandje niet ophalen: ",
            err
          );
          callback(err, null);
        } else {
          console.log("Aantal producten in uitleenmandje opgehaald");
          callback(null, result);
        }
      }
    );
  }

  // Get all article ID's of specific product
  getArticlesByProductId(productID, callback) {
    this.connection.query(
      `SELECT artikelID FROM Artikel WHERE productID = ${productID}`,
      (err, result) => {
        if (err) {
          console.error("Kan artikelen niet ophalen: ", err);
          callback(err, null);
        } else {
          console.log("Artikelen opgehaald");
          callback(null, result);
        }
      }
    );
  }

  // Get all article ID's that are unavailable during chosen date range
  getUnavailableArticles(startDatum, eindDatum, callback) {
    this.connection.query(
      `SELECT artikelID FROM Uitlening WHERE startDatum <= '${startDatum}' AND eindDatum >= '${startDatum}'`,
      (err, result) => {
        if (err) {
          console.error("Kan onbeschikbare artikelen niet ophalen: ", err);
          callback(err, null);
        } else {
          console.log("Onbeschikbare artikelen opgehaald: ", result);
          callback(null, result);
        }
      }
    );
  }

  // Get all article ID's that are unavailable during chosen date range
  removeProductFromUserBasket(userID, productID, callback) {
    this.connection.query(
      `DELETE FROM Uitleenmandje WHERE userID = ${userID} AND productID = ${productID}`,
      (err, result) => {
        if (err) {
          console.error("Kan uitleenmandje niet legen of is al leeg: ", err);
          callback(err, null);
        } else {
          console.log("Uitleenmandje van user leeggemaakt");
          callback(null, result);
        }
      }
    );
  }
}

module.exports = DBService;
