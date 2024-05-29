const basketItems = document.querySelectorAll(".item-list__item");
let products = [];
const btnReserveren = document.getElementById("btn-reserveren");
const dropdownReden = document.getElementById("reden");
const otherReasonInput = document.getElementById(`otherReason`);
updateBasketCounter();

dropdownReden.addEventListener("change", () => {
  if (dropdownReden.value === "Andere") {
    otherReasonInput.style.display = "block";
  } else {
    otherReasonInput.style.display = "none";
  }
});

basketItems.forEach((item) =>
  products.push(item.getAttribute("data-product-id"))
);

btnReserveren.addEventListener("click", async () => {
  // Haal gegevens op
  const startDatum = document.getElementById("datepicker").value;
  let reden;
  // Get reden from page
  if (dropdownReden.value === "Andere") {
    reden = otherReasonInput.value;
  } else {
    reden = dropdownReden.value;
  }

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
        updateBasketCounter();
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

function updateBasketCounter() {
  fetch("/get-basket-count")
    .then((response) => response.json())
    .then((data) => {
      const basketCounter = document.getElementById("header-cart-item-count");

      if (data[0].count == 0) {
        basketCounter.style.visibility = "hidden";
        basketCounter.innerText = 0;
      } else {
        basketCounter.style.visibility = "visible";
        basketCounter.innerText = data[0].count;
      }
    })
    .catch((error) => console.error("Error:", error));
}

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
