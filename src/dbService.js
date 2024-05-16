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

    this.connection.on('error', function(err) {
      console.error('Database error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
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

  addReservation(userID, artikelID, reden, startDatum, eindDatum) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Uitlening (userID, artikelID, reden, startDatum, eindDatum, isVerlengd, isBeschadigd, isUitgeleend)
        VALUES (?, ?, ?, ?, ?, 0, 0, 1)
      `;
      console.log('Uitvoeren query:', query);
      this.connection.query(query, [userID, artikelID, reden, startDatum, eindDatum], (error, results) => {
        if (error) {
          console.error('Fout bij uitvoeren query:', error);
          return reject(error);
        }
        resolve(results);
      });
    });
  }


  createBasketItem(uitleenmandjeID, userID, productID, amount, callback) {
    if (uitleenmandjeID === null) {
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
            console.log("Lending basket item added succesfully");
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

  removeBasketItem(UitleenmandjeID, userID, productID, callback) {
    this.connection.query(
      `DELETE FROM Uitleenmandje WHERE UitleenmandjeID = ${UitleenmandjeID} AND userID = ${userID} AND productID = ${productID}`,
      (err, result) => {
        if (err) {
          console.error("Kan item niet verwijderen uit uitleenmandje: ", err);
          callback(err, null);
        } else {
          console.log("Item succesvol verwijdert uit uitleenmandje");
          callback(null, result);
        }
      }
    )
  }

  getBasketItemsCount(UitleenmandjeID, userID, callback) {
    this.connection.query(
      `SELECT COUNT(*) AS count FROM Uitleenmandje WHERE UitleenmandjeID = ${UitleenmandjeID} AND userID = ${userID}`,
      (err, result) => {
        if (err) {
          console.error("Kan aantal producten in uitleenmandje niet ophalen: ", err);
          callback(err, null);
        } else {
          console.log("Aantal producten in uitleenmandje opgehaald");
          callback(null, result);
        }
      }
    )
  }

}

module.exports = DBService;
