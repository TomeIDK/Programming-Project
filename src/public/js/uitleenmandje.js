const basketItems = document.querySelectorAll(".item-list__item");
let products = [];
const btnReserveren = document.getElementById("btn-reserveren");

basketItems.forEach((item) =>
  products.push(item.getAttribute("data-product-id"))
);

btnReserveren.addEventListener("click", async () => {
  // Haal gegevens op
  const startDatum = document.getElementById("datepicker").value;
  const reden = "test reden";

  // Validate gegevens
  if (!startDatum) {
    loadScript("/components/toast/toast.js", (script) => {
      console.log(`Script ${script.src} loaded.`);
      showToast("Selecteer een startdatum voor de reservatie.", false);
    });
    return;
  }

  if (!reden) {
    loadScript("/components/toast/toast.js", (script) => {
      console.log(`Script ${script.src} loaded.`);
      showToast("Kies een reden voor uw reservatie", false);
    });
    return;
  }

  const reservationData = {
    products: products,
    reden: reden,
    startDatum: startDatum,
  };

  // POST request to add reservation
  await fetch("/reserveren", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reservationData }),
  })
    .then((response) => response.text())
    .then((data) => {
      loadScript("/components/toast/toast.js", (script) => {
        console.log(`Script ${script.src} loaded.`);
        showToast("Reservatie geslaagd", true);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      loadScript("/components/toast/toast.js", (script) => {
        console.log(`Script ${script.src} loaded.`);
        showToast("Uw reservatie kon niet aangemaakt worden", false);
      });
    });
    location.reload(true);
});

document.getElementById("terugBtn").addEventListener("click", function () {
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
  btnDelete = basketItems[i].querySelectorAll(`#btn-delete${i}`)[0];
  btnDelete.addEventListener("click", async () => {
    fetch("/uitleenmandje/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productID: productID }),
    })
      .then((response) => {
        console.log(response.status);
        return response.text();
      })
      .then((data) => {
        basketItems[i].remove();
        loadScript("/components/toast/toast.js", (script) => {
          console.log(`Script ${script.src} loaded.`);
          showToast("Product verwijdert uit uitleenmandje", true);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        loadScript("/components/toast/toast.js", (script) => {
          console.log(`Script ${script.src} loaded.`);
          showToast("Kan product niet uit uitleenmandje verwijderen", false);
        });
      });
  });
}

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
