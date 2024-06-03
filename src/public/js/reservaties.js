const reservations = document.querySelectorAll(".reservation__line");

updateBasketCounter();

reservations.forEach((reservation, index) => {
  const btnCancel = reservation.querySelectorAll(`#btn-cancel${index}`)[0];
  const uitleningID = reservation.getAttribute("data-id");

  btnCancel.addEventListener("click", async () => {
    try {
      const response = await fetch("/reservaties", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uitleningID: uitleningID }),
      });

      const data = await response.text();

      if (response.ok) {
        reservation.remove();
        loadScript("/components/toast/toast.js", (script) => {
          showToast("Reservatie succesvol geannuleerd", true);
        });
      } else {
        console.error("Kan reservatie niet annuleren:", data);
        loadScript("/components/toast/toast.js", (script) => {
          showToast("Kan reservatie niet annuleren", false);
        });
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  });
});

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
