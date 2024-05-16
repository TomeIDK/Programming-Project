const express = require("express");
const router = express.Router();
const DBService = require("../dbService");

const dbService = new DBService();

// Route voor het maken van een reservering
router.post("/", async (req, res) => {
  try {
    const { userId, artikelId, reden, startDatum, eindDatum } = req.body;
    console.log('Ontvangen reserveringsdata:', { userId, artikelId, reden, startDatum, eindDatum });
    
    const result = await dbService.addReservation(userId, artikelId, reden, startDatum, eindDatum);
    res.status(201).json({ success: true, message: "Reservering succesvol", data: result });
  } catch (error) {
    console.error('Fout bij het maken van de reservering:', error);
    res.status(500).json({ success: false, message: "Er is een fout opgetreden", error: error.message });
  }
});

module.exports = router;
