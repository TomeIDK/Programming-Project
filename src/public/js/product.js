const btnBack = document.getElementById("btn-terug");
const btnAdd = document.getElementById("btn-add");

// Update basket count on load
updateBasketCounter();

btnBack.addEventListener("click", () => {
    window.location.href = "/cataloog";
});

btnAdd.addEventListener("click", async () => {
    let productID = btnAdd.getAttribute("data-id");
    try {
      const response = await fetch("/cataloog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productID: productID, amount: 1 }),
      });
      if (response.ok) {
        updateBasketCounter();
        loadScript("/components/toast/toast.js", (script) => {
          console.log(`Script ${script.src} loaded.`);
          showToast("Product toegevoegd aan uitleenmandje", true);
        });
      } else {
        console.error("Request failed with status:", response.status);
        loadScript("/components/toast/toast.js", (script) => {
          console.log(`Script ${script.src} loaded.`);
          showToast("Kan product niet toevoegen aan uitleenmandje", false);
        });
      }
    } catch (error) {
      console.error("Request failed:", error);
      loadScript("/components/toast/toast.js", (script) => {
        console.log(`Script ${script.src} loaded.`);
        showToast("Kan product niet toevoegen aan uitleenmandje", false);
      });
    }
  });


// Uitleenmandje counter
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