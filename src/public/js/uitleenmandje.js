const dbService = require('../../dbService');
const basketItems = document.querySelectorAll(".item-list__item");
console.log("uitleenmandje.js is geladen");

document.getElementById("lenenBtn").addEventListener("click", function () {
  console.log("Reserveren knop geklikt");

  // Gegevens verzamelen
  const userId = 1; // Harde code voor nu, in werkelijkheid ophalen van sessie of andere bron
  const artikelId = 12345; // Deze waarden moeten dynamisch zijn
  const reden = "Reden voor lening";
  const startDatum = document.getElementById("datepicker").value; // Haal startdatum op van datepicker
  const eindDatum = "2023-12-15"; // Deze waarde moet dynamisch zijn

  // Controleer of de startdatum is ingevuld
  if (!startDatum) {
    alert("Selecteer een startdatum.");
    return;
  }

  // Data object
  const reservationData = {
    userId: userId,
    artikelId: artikelId,
    reden: reden,
    startDatum: startDatum,
    eindDatum: eindDatum,
  };

  console.log("Verzenden reserveringsdata:", reservationData);

  // Fetch-aanroep om reservering aan te maken
  fetch("/reserveren", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Reservering resultaat:", data);
      if (data.success) {
        showPopup(
          "Reservatie geslaagd",
          "Je reservatie is gelukt. Er wordt een e-mail gestuurd naar ... met de bevestigingsdetails. Op te halen op: " +
            startDatum +
            ". Terug te brengen op: " +
            eindDatum +
            ". Product: " +
            artikelId
        );
      } else {
        showPopup(
          "Fout",
          "Er is een fout opgetreden bij het maken van de reservering: " +
            data.message
        );
      }
    })
    .catch((error) => {
      console.error("Fetch fout:", error);
      showPopup(
        "Fout",
        "Er is een fout opgetreden bij het maken van de reservering: " +
          error.message
      );
    });
});

document.getElementById("terugBtn").addEventListener("click", function () {
  console.log("Terug knop geklikt");
  window.location.href = "/cataloog"; // Vervang dit door de juiste URL naar de catalogus pagina
});

function showPopup(title, message) {
  // Maak popup element aan
  var popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML =
    "<h3>" +
    title +
    "</h3><p>" +
    message +
    '</p><button class="btn cta-button--blue" onclick="closePopup()">Close</button>';

  // Voeg popup toe aan body
  document.body.appendChild(popup);
}

function closePopup() {
  var popup = document.querySelector(".popup");
  popup.parentNode.removeChild(popup);
}

// Delete button functionaliteit
for (let i = 0; i < basketItems.length; i++) {
  let productID = basketItems[i].getAttribute("data-product-id");  
  btnDelete = basketItems[i].querySelectorAll(`#btn-delete${i}`);
  btnDelete.addEventListener("click", async () => {
    fetch("/session-data")
    .then((response) => response.json())
    .then((data) => {
        dbServiceInstance = new dbService();
        dbServiceInstance.removeBasketItem(data.UitleenmandjeID, data.userID, productID, (err, result) => {
            if (err) {
                loadScript("/components/toast/toast.js", (script) => {
                    console.log(`Script ${script.src} loaded.`);
                    showToast("Kan product niet uit uitleenmandje verwijderen", false);
                  });
            } else {
                loadScript("/components/toast/toast.js", (script) => {
                    console.log(`Script ${script.src} loaded.`);
                    showToast("Product verwijdert uit uitleenmandje", true);
                  });
            }
        });

    })
    .catch((error) => console.error("Error:", error));
  });
}
