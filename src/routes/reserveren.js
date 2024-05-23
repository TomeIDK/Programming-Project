const express = require("express");
const router = express.Router();
const dbService = require("../dbService");

const dbServiceInstance = new dbService();

// Promise wrapper for the callback-based function
const getArticlesByProductIdPromise = (productID) => {
  return new Promise((resolve, reject) => {
    dbServiceInstance.getArticlesByProductId(productID, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Promise wrapper for getAvailableArticle
const getUnavailableArticlesPromise = (startDatum, eindDatum) => {
  return new Promise((resolve, reject) => {
    dbServiceInstance.getUnavailableArticles(
      startDatum,
      eindDatum,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Promise wrapper for addReservation function
const addReservationPromise = (
  userID,
  artikelID,
  reden,
  startDatum,
  eindDatum
) => {
  return new Promise((resolve, reject) => {
    dbServiceInstance.addReservation(
      userID,
      artikelID,
      reden,
      startDatum,
      eindDatum,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Route voor het maken van een reservering
router.post("/", async (req, res) => {
  try {
    let { products, reden, startDatum } = req.body.reservationData;
    console.log("startdatum: ", startDatum);
    console.log(req.body);
    startDatum = convertToSQLDatetime(startDatum);

    let eindDatumDate = new Date(startDatum);
    let eindDatumDateModified = addDays(eindDatumDate, 7);
    let eindDatum = convertFromDateToSQLDatetime(eindDatumDateModified);

    for (const productID of products) {
      try {
        const articles = await getArticlesByProductIdPromise(productID);

        const productArticles = articles.map((artikel) => artikel.artikelID);
        console.log(
          "Artikelen van product opgehaald. product: ",
          productID,
          " - ",
          productArticles
        );

        const unavailableArticles = await getUnavailableArticlesPromise(
          startDatum,
          eindDatum
        );

        const unavailableArticlesArray = unavailableArticles.map(
          (article) => article.artikelID
        );

        const availableArticle = productArticles.find(
          (value) => !unavailableArticlesArray.includes(value)
        );
        console.log(availableArticle);

        if (availableArticle !== undefined) {
          await addReservationPromise(
            req.session.user.userID,
            availableArticle,
            reden,
            startDatum,
            eindDatum
          );
        } else {
          res
            .status(404)
            .send("Geen artikel beschikbaar voor productID " + productID);
          return;
        }
      } catch (err) {
        console.log(
          "Kan artikelen niet ophalen voor product: ",
          productID,
          ": ",
          err
        );
      }
    }
  } catch (error) {
    console.error("Fout bij het maken van de reservering:", error);
    res.status(500).send("Kan reservering niet maken");
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
