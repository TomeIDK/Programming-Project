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
  document.getElementById("flexbox").appendChild(productInfo);
}

function displayUitleningen(data) {
  let heading =document.createElement("li");
  let headingId = document.createElement("span");
  headingId.innerText = "ID";
  headingId.classList.add("heading");
  let headingUserNaam = document.createElement("span");
  headingUserNaam.innerText = "Gebruiker";
  headingUserNaam.classList.add("heading");
  let headingStartDatum = document.createElement("span");
  headingStartDatum.innerText = "Start Datum";
  headingStartDatum.classList.add("heading");
  let headingEindDatum = document.createElement("span");
  headingEindDatum.innerText = "Eind Datum";
  headingEindDatum.classList.add("heading");
  let headingTerugbrengen = document.createElement("span");
  headingTerugbrengen.innerText = "Terugbrengen";
  headingTerugbrengen.classList.add("heading");
 
  heading.appendChild(headingId);
  heading.appendChild(headingUserNaam);
  heading.appendChild(headingStartDatum);
  heading.appendChild(headingEindDatum);
  heading.appendChild(headingTerugbrengen);

  if (document.getElementById("uitleningen-lijst")) {
    let previousUitleningenLijst = document.getElementById("uitleningen-lijst");
    previousUitleningenLijst.remove();
  }
  let uitleningenLijst = document.createElement("div");
  uitleningenLijst.id = "uitleningen-lijst";

  let uitleningenLijstUl = document.createElement("ul");
uitleningenLijstUl.appendChild(heading);
  for (let i = 0; i < data.uitleningen.length; i++) {
    let uitlening = document.createElement("li");

    let uitleningId = document.createElement("span");
    uitleningId.innerText = data.uitleningen[i].uitleningID;
    uitleningId.classList.add("uitlening-id");

    let uitleningUserNaam = document.createElement("span");
    uitleningUserNaam.innerText =
      data.uitleningen[i].naam + " " + data.uitleningen[i].voornaam;
      uitleningUserNaam.classList.add("uitlening-gebruiker");

      let uitleningStartDatum = document.createElement("span");
      uitleningStartDatum.innerText = formatDate(data.uitleningen[i].startDatum);
      uitleningStartDatum.classList.add("uitlening-start-datum");
      
      let uitleningEindDatum = document.createElement("span");
      uitleningEindDatum.innerText = formatDate(data.uitleningen[i].eindDatum);
      uitleningEindDatum.classList.add("uitlening-eind-datum");

    let uitleningTerugbrengen = document.createElement("button");
    uitleningTerugbrengen.id = `btn-terugbrengen${i}`;
    uitleningTerugbrengen.classList.add("btn");
    uitleningTerugbrengen.classList.add("secondary-button");
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

  document.getElementById("flexbox").appendChild(uitleningenLijst);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}