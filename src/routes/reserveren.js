const express = require("express");
const router = express.Router();
const dbService = require("../dbService");
const { promisify } = require("util");

const dbServiceInstance = new dbService();

// Route voor het maken van een reservering
router.post("/", async (req, res) => {
  try {
    let { products, reden, startDatum } = req.body;
    startDatum = convertToSQLDatetime(startDatum);

    let eindDatumDate = new Date(startDatum);
    let eindDatumDateModified = addDays(eindDatumDate, 7);
    let eindDatum = convertFromDateToSQLDatetime(eindDatumDateModified);
  } catch (error) {
    console.error("Fout bij het maken van de reservering:", error);
    res.status(500).json({
      success: false,
      message: "Er is een fout opgetreden",
      error: error.message,
    });
  }
});

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function convertToSQLDatetime(dateString) {
  // Split the date string
  const [day, month, year] = dateString.split("/");

  // Create a new Date object
  const date = new Date(`${year}-${month}-${day}T00:00:00`);

  // Extract components
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  // Format to SQL datetime
  const sqlDatetime = `${yyyy}-${mm}-${dd}`;

  return sqlDatetime;
}

function convertFromDateToSQLDatetime(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

module.exports = router;
