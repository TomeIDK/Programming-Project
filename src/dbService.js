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
}

module.exports = DBService;
