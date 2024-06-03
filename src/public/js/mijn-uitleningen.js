updateBasketCounter();

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