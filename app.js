<<<<<<< Updated upstream
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
=======
import mysql from'mysql';

const connection = mysql.createConnection({
    host: '', // Change this to your MySQL host
    user: '2324PROGPRGR10',      // Your MySQL username
    password: 'hVWX33SX',      // Your MySQL password
    database: '2324PROGPRGR10' // Your database name
}).promise()

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database');
>>>>>>> Stashed changes
});