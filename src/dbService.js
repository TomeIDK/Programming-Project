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

  createBasketItem(UitleenmandjeID, userID, productID, amount, callback) {
    // Check if Uitleenmandje already exists
    this.connection.query(
      `SELECT UitleenmandjeID FROM Uitleenmandje WHERE UitleenmandjeID = ${UitleenmandjeID}`,
      (err, result) => {
        if (err) {
          console.error("Query encountered an error: ", err);
          callback(err, null);
        } else if (result.length <= 0) {
          // If Uitleenmandje was not found create a new uileenmandje for user
          this.connection.query(
            `INSERT INTO Uitleenmandje (userID, productID, aantal) VALUES (${userID}, ${productID}, 1)`,
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Error creating new basket: ", insertErr);
                callback(insertErr, null);
              } else {
                console.log("New basket created successfully");
                callback(null, true);
              }
            }
          );
        } else {
          // If User already has an Uitleenmandje check if product is already in Uitleenmandje
          this.connection.query(
            `SELECT * FROM Uitleenmandje WHERE UitleenmandjeID = ${UitleenmandjeID} AND userID = ${userID} AND productID = ${productID}`,
            (selectErr, selectResult) => {
              if (selectErr) {
                console.error(
                  "Error checking if item exists in basket: ",
                  selectErr
                );
                callback(selectErr, null);
              } else if (selectResult.length > 0) {
                // If product already exists in Uitleenmandje increase aantal by 1
                let currentQuantity = selectResult[0].aantal + 1;
                this.connection.query(
                  `UPDATE Uitleenmandje SET aantal = ${currentQuantity} WHERE UitleenmandjeID = ${UitleenmandjeID} AND userID = ${userID} AND productID = ${productID}`,
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
                // If product does not yet exist in Uitleenmandje, add it
                this.connection.query(
                  `INSERT INTO Uitleenmandje (UitleenmandjeID, userID, productID, aantal) VALUES (${UitleenmandjeID}, ${userID}, ${productID}, 1)`,
                  (insertErr, insertResult) => {
                    if (insertErr) {
                      console.error("Error adding item to basket: ", insertErr);
                      callback(insertErr, null);
                    } else {
                      console.log("Item added to basket succesfully");
                      callback(null, insertResult);
                    }
                  }
                );
              }
            }
          );
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

  getProductByArticleId(artikelID, callback) {
    this.connection.query(
      `SELECT Product.afbeelding, Product.naam, Product.productID
      FROM Product
      JOIN Artikel ON Product.productID = Artikel.productID
      WHERE Artikel.artikelID = ${artikelID}`,
      (err, result) => {
        if (err) {
          console.error("Error fetching product data: ", err);
          callback(err, null);
        } else {
          console.log("Product data opgehaald");
          callback(null, result);
        }
      }
    );
  }

  getUitleningenByArticleId(artikelID, callback) {
    this.connection.query(
      `SELECT uitleningID, startDatum, eindDatum, User.voornaam, User.naam
      FROM Uitlening
      JOIN User ON Uitlening.userID = User.userID
      WHERE artikelID = ${artikelID}`,
      (err, result) => {
        if (err) {
          console.error("error fetching uitleningen: ", err);
          callback(err, null);
        } else {
          console.log("Uitleningen succesvol opgehaald");
          callback(null, result);
        }
      }
    );
  }

  // Cancel a reservation
  cancelReservation(uitleningID, callback) {
    this.connection.query(
      `DELETE FROM Uitlening WHERE uitleningID = ${uitleningID}`,
      (err, result) => {
        if (err) {
          console.error("Kan reservatie niet annuleren: ", err);
          callback(err, null);
        } else {
          console.log("Reservatie geannuleerd");
          callback(null, result);
        }
      }
    );
  }

  getUitlening(uitleningID, callback) {
    this.connection.query(
      `SELECT uitleningID, artikelID, startDatum, eindDatum, User.voornaam, User.naam
      FROM Uitlening
      JOIN User ON Uitlening.userID = User.userID
      WHERE uitleningID = ${uitleningID}`,
      (err, result) => {
        if (err) {
          console.error("error fetching uitleningen: ", err);
          callback(err, null);
        } else {
          console.log("Uitleningen succesvol opgehaald");
          callback(null, result);
        }
      }
    );
  }

  returnUitlening(uitleningID, isBeschadigd, callback) {
    // Get today's date
    const today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    console.log(isBeschadigd);
    console.log(uitleningID);

    this.connection.query(
      `UPDATE Uitlening SET inleverDatum = '${formattedDate}', isBeschadigd = ${isBeschadigd} WHERE uitleningID = ${uitleningID}`,
      (err, result) => {
        if (err) {
          console.error("Error updating uitlening: ", err);
          callback(err, null);
        } else {
          console.log("Uitleningen succesvol geupdatet");
          callback(null, result);
        }
      }
    );
  }
}

module.exports = DBService;
