const mysql = require("mysql");
require("dotenv").config();

class DBService {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
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

    addReservation(productId, userId, reservationDate, callback) {
        this.connection.query(
            "INSERT INTO Reservations (ProductID, UserID, ReservationDate) VALUES (?, ?, ?)",
            [productId, userId, reservationDate],
            (err, result) => {
                if (err) {
                    console.error('Error adding reservation to database: ', err);
                    callback(err, null);
                } else {
                    console.log('Reservation added successfully');
                    callback(null, result);
                }
            }
        );
    }
    
}

module.exports = DBService;

