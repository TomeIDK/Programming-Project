const reservations = document.querySelectorAll(".reservation__line");

reservations.forEach((reservation, index) => {
  const btnCancel = reservation.querySelectorAll(`#btn-cancel${index}`)[0];
  const uitleningID = reservation.getAttribute("data-id");

  btnCancel.addEventListener("click", async () => {
    console.log("fired");
    console.log(uitleningID);
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
          console.log(`Script ${script.src} loaded.`);
          showToast("Reservatie succesvol geannuleerd", true);
        });
      } else {
        console.error("Kan reservatie niet annuleren:", data);
        loadScript("/components/toast/toast.js", (script) => {
          console.log(`Script ${script.src} loaded.`);
          showToast("Kan reservatie niet annuleren", false);
        });
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  });
});

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
