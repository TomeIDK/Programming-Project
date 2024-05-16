// Uitleenmandje Direction
const btnBasket = document.getElementById("btn-cart");

btnBasket.addEventListener("click", () => {
  fetch("/session-data")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.UitleenmandjeID === null) {
        loadScript("/components/toast/toast.js", (script) => {
          console.log(`Script ${script.src} loaded.`);
          showToast("Kies eerst een product", false);
        });
        return;
      }
      window.location.href = `/uitleenmandje/${data.UitleenmandjeID}`;
    })
    .catch((error) => console.error("Error:", error));
});

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
