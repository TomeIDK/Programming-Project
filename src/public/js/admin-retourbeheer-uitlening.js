const isBeschadigd = document.getElementById("beschadigd");
const beschadigdReason = document.getElementById("beschadigd-reason");
const btnTerug = document.getElementById("btn-terug");
const btnTerugbrengen = document.getElementById("btn-terugbrengen");
const uitleningID = document.getElementById("id-nr").innerText;
let isBeschadigdValue = 0;

isBeschadigd.addEventListener("change", () => {
  if (isBeschadigd.checked) {
    beschadigdReason.style.display = "block";
  } else {
    beschadigdReason.style.display = "none";
  }
});

btnTerug.addEventListener("click", () => {
  window.location.href = "/admin/retourbeheer";
});

btnTerugbrengen.addEventListener("click", async () => {
  if (isBeschadigd.checked) {
    isBeschadigdValue = 1;
  } else {
    isBeschadigdValue = 0;
  }

  try {
    const response = await fetch("/admin/retourbeheer/:uitleningID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isBeschadigd: isBeschadigdValue,
      }),
    });

    const data = await response.text();

    if (response.ok) {
      loadScript("/components/toast/toast.js", (script) => {
        console.log(`Script ${script.src} loaded.`);
        showToast("Uitlening succesvol teruggebracht", true);
      });
    window.location.href = "/admin/retourbeheer";
    } else {
      console.error("Failed to update uitlening:", data);
      loadScript("/components/toast/toast.js", (script) => {
        console.log(`Script ${script.src} loaded.`);
        showToast("Kan uitlening niet terugbrengen", false);
      });
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    loadScript("/components/toast/toast.js", (script) => {
      console.log(`Script ${script.src} loaded.`);
      showToast("Kan uitlening niet terugbrengen", false);
    });
  }
});

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
