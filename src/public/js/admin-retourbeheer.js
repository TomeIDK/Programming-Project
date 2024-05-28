const btnSearch = document.getElementById("btn-search-article");
const main = document.getElementById("main");

btnSearch.addEventListener("click", async () => {
  const artikelID = document.getElementById("id-input").value;

  if (artikelID == null) {
    console.log(artikelID);
  }
  try {
    const response = await fetch("/admin/retourbeheer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artikelID: artikelID }),
    });

    const data = await response.json();

    if (response.ok) {
      displayProductData(data);
      displayUitleningen(data);


    } else {
      console.error("Failed to fetch article data:", data);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
});

function displayProductData(data) {
  if (document.getElementById("product-info")) {
    let previousProductInfo = document.getElementById("product-info");
    previousProductInfo.remove();
  }
  let productInfo = document.createElement("div");
  productInfo.classList.add("product-info");
  productInfo.id = "product-info";

  let productImg = document.createElement("img");
  productImg.id = "product-image";
  productImg.src = `/images/${data.product.afbeelding}`;
  productImg.alt = data.product.naam;
  productImg.width = 100;

  let productNaam = document.createElement("h2");
  productNaam.innerText = data.product.naam;

  productInfo.appendChild(productImg);
  productInfo.appendChild(productNaam);
  main.appendChild(productInfo);
}

function displayUitleningen(data) {
  if (document.getElementById("uitleningen-lijst")) {
    let previousUitleningenLijst = document.getElementById("uitleningen-lijst");
    previousUitleningenLijst.remove();
  }
  let uitleningenLijst = document.createElement("div");
  uitleningenLijst.id = "uitleningen-lijst";

  let uitleningenLijstUl = document.createElement("ul");

  for (let i = 0; i < data.uitleningen.length; i++) {
    let uitlening = document.createElement("li");

    let uitleningId = document.createElement("span");
    uitleningId.innerText = data.uitleningen[i].uitleningID;

    let uitleningUserNaam = document.createElement("span");
    uitleningUserNaam.innerText =
      data.uitleningen[i].naam + " " + data.uitleningen[i].voornaam;

    let uitleningStartDatum = document.createElement("span");
    uitleningStartDatum.innerText = data.uitleningen[i].startDatum;

    let uitleningEindDatum = document.createElement("span");
    uitleningEindDatum.innerText = data.uitleningen[i].eindDatum;

    let uitleningTerugbrengen = document.createElement("button");
    uitleningTerugbrengen.id = `btn-terugbrengen${i}`;
    uitleningTerugbrengen.classList.add("btn");
    uitleningTerugbrengen.classList.add("tertiary-button");
    uitleningTerugbrengen.innerText = "Terugbrengen";

    uitleningTerugbrengen.addEventListener("click", () => {
        window.location.href = `/admin/retourbeheer/${uitleningId.innerText}`;
    });

    uitlening.appendChild(uitleningId);
    uitlening.appendChild(uitleningUserNaam);
    uitlening.appendChild(uitleningStartDatum);
    uitlening.appendChild(uitleningEindDatum);
    uitlening.appendChild(uitleningTerugbrengen);
    uitleningenLijstUl.appendChild(uitlening);
  }

  uitleningenLijst.appendChild(uitleningenLijstUl);
  main.appendChild(uitleningenLijst);
}
