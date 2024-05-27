// Uitleenmandje Direction
const btnBasket = document.getElementById("btn-cart");
const btnLogout = document.getElementById("btn-logout");

// Uitleenmandje icon fetch product count
// Direct to uitleenmandje page when clicked
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

// Logout button destroys session, on success show toast explaining logout was succesful then redirect to /login
btnLogout.addEventListener("click", async () => {
  try {
    const response = await fetch("/logout", {
      method: "DELETE",
    });

    const data = await response.text();

    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.error("Logout failed:", data);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
});
function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
