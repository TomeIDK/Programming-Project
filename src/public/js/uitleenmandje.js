const dbService = require('../../dbService');
const basketItems = document.querySelectorAll(".item-list__item");
console.log("uitleenmandje.js is geladen");

document.getElementById("lenenBtn").addEventListener("click", function () {
  console.log("Reserveren knop geklikt");


    // Haal gegevens op
    const startDatum = document.getElementById('datepicker').value; // Haal startDatum op van datepicker

    // Controleer of de startDatum is ingevuld
    if (!startDatum) {
        loadScript("/components/toast/toast.js", (script) => {
            console.log(`Script ${script.src} loaded.`);
            showToast("Selecteer een startdatum.", false);
        });
        return;
    }

    // Parse de startDatum
    const startDate = new Date(startDatum.split('/').reverse().join('-')); // Maak een Date object van de startDatum
    if (isNaN(startDate)) {
        loadScript("/components/toast/toast.js", (script) => {
            console.log(`Script ${script.src} loaded.`);
            showToast("Ongeldige startdatum.", false);
        });
        return;
    }

    // Bereken eindDatum als startDatum + 7 dagen
    const eindDatum = new Date(startDate);
    eindDatum.setDate(startDate.getDate() + 7);
    const eindDatumFormatted = eindDatum.toISOString().split('T')[0]; // Formatteer eindDatum naar YYYY-MM-DD

    // Haal userID en andere benodigde gegevens op uit de sessie via de server
    fetch('/session-data')
    .then(response => response.json())
    .then(data => {
        if (!data.userID || !data.artikelID || !data.reden) {
            loadScript("/components/toast/toast.js", (script) => {
                console.log(`Script ${script.src} loaded.`);
                showToast("Niet ingelogd of onvolledige gegevens", false);
            });
            return;
        }
        const userID = data.userID;
        const artikelID = data.artikelID; // Zorg ervoor dat artikelID in de sessie aanwezig is
        const reden = data.reden; // Zorg ervoor dat reden in de sessie aanwezig is

        // Data object
        const reservationData = {
            userID: userID,
            artikelID: artikelID,
            reden: reden,
            startDatum: startDatum.split('/').reverse().join('-'), // Formatteer startDatum naar YYYY-MM-DD
            eindDatum: eindDatumFormatted
        };

        console.log('Verzenden reserveringsdata:', reservationData);

        // Fetch-aanroep om reservering aan te maken
        return fetch('/reserveren', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });
    })
    .then(response => response.json())
    .then(data => {
        console.log('Reservering resultaat:', data);
        loadScript("/components/toast/toast.js", (script) => {
            console.log(`Script ${script.src} loaded.`);
            if (data.success) {
                showToast('Je reservatie is gelukt. Er wordt een e-mail gestuurd naar ... met de bevestigingsdetails.', true);
            } else {
                showToast('Er is een fout opgetreden bij het maken van de reservering: ' + data.message, false);
            }
        });
    })
    .catch(error => {
        console.error('Fetch fout:', error);
        loadScript("/components/toast/toast.js", (script) => {
            console.log(`Script ${script.src} loaded.`);
            showToast('Er is een fout opgetreden bij het maken van de reservering: ' + error.message, false);
        });

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

function loadScript(src, cb) {
    let script = document.createElement("script");
    script.src = src;
    script.onload = () => cb(script);
    document.head.append(script);

}
