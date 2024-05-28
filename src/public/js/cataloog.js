const searchBar = document.getElementById("search-bar");
const tagFilter = document.getElementById("tag-filter");
const tagList = document.getElementById("tag-filter-list");
const btnFilter = document.getElementById("search-bar-btn-filter");
const selectedTagsList = document.getElementById("selected-tags-list");
const tagFilterSpan = document.getElementById("tag-filter-span");
const tagCheckboxes = document.getElementsByClassName("dropdown__checkbox");
const tagLabels = Array.from(
  document.getElementsByClassName("dropdown__label")
);
const productCards = document.querySelectorAll(".catalog__product");
// Fetch user's basket items on load
updateBasketCounter();

// Specs redirection
for (let i = 0; i < productCards.length; i++) {
  let btnSpecs = document.getElementById(`btn-specs${i}`);
  let productId = btnSpecs.getAttribute("data-id");
  btnSpecs.addEventListener("click", () => {
    window.location.href = `/product/${productId}`;
  });
}

// Filters

// Horizontal scroll via scroll wheel on selected tags list
selectedTagsList.addEventListener("wheel", function (e) {
  let scrollSpeed = 20;
  if (e.deltaY > 0) selectedTagsList.scrollLeft += scrollSpeed;
  else selectedTagsList.scrollLeft -= scrollSpeed;
});

// (Test) Values
let selectedTags = [];
const testList = document.getElementById("test");

for (let i = 0; i < tagCheckboxes.length; i++) {
  tagCheckboxes[i].addEventListener("change", () => {
    if (tagCheckboxes[i].checked) {
      addTag(tagLabels[i].innerText);
    } else {
      removeTag(tagLabels[i].innerText);
    }
    updateTags();
  });
}

// Add tag to filter array
function addTag(tag) {
  selectedTags.push(tag);

  let selectedTag = document.createElement("li");
  selectedTag.classList.add("selected-tag");

  let selectedTagSpan = document.createElement("span");
  selectedTagSpan.innerText = tag;

  let selectedTagClose = document.createElement("img");
  selectedTagClose.src = "../../images/x-mark.svg";
  selectedTagClose.classList.add("selected-tag__close");
  selectedTagClose.alt = "X";

  selectedTag.appendChild(selectedTagSpan);
  selectedTag.appendChild(selectedTagClose);
  selectedTagsList.appendChild(selectedTag);

  selectedTagClose.addEventListener("click", () => {
    removeTag(tag);
    updateTags();
  });
}

// Remove tag from filter array and selected tags list
function removeTag(tag) {
  let index = selectedTags.indexOf(tag);
  if (index > -1) {
    selectedTags.splice(index, 1);
  }

  // Uncheck removed tag
  let tagListItems = tagList.querySelectorAll("li label");
  tagListItems.forEach((item) => {
    if (item.innerText == tag) {
      item.querySelectorAll("input")[0].checked = false;
    }
  });

  // Remove tags from selected tags list
  let selectedTagsListItems = selectedTagsList.querySelectorAll("li");
  selectedTagsListItems.forEach((item) => {
    if (item.querySelectorAll("span")[0].innerText == tag) {
      item.remove();
    }
  });
}

// Read all values of filter array and update accordingly
function updateTags() {
  btnFilter.prepend(tagFilterSpan); // Show "Selecteer Tags"
  selectedTagsList.style.display = "hidden"; // Remove inline taglist
  if (selectedTags.length == 0) {
    productCards.forEach((item) => {
      item.style.display = "";
    });
  } else {
    tagFilterSpan.remove(); // Remove "Selecteer Tags"
    selectedTagsList.style.visibility = "visible"; // Show inline taglist

    let txtValue;

    // Loop through all cards
    for (i = 0; i < productCards.length; i++) {
      let productTags = productCards[i].querySelectorAll(".product__tag");

      // Loop through every tag of current card and hide cards
      // that don't have at least 1 of the selected tags
      for (let j = 0; j < productTags.length; j++) {
        txtValue = productTags[j].textContent || productTags[j].innerText;
        if (selectedTags.includes(txtValue)) {
          productCards[i].style.display = "";
          break;
        } else {
          productCards[i].style.display = "none";
        }
      }
    }
  }
}

// Search bar filter
searchBar.addEventListener("keyup", () => {
  let txtValue;
  let filter = searchBar.value.toUpperCase();

  // Loop through all products and hide those which don't match the search query
  for (i = 0; i < productCards.length; i++) {
    let productTitle = productCards[i].querySelectorAll(".product__title");
    txtValue = productTitle[0].textContent || productTitle[0].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      productCards[i].style.display = "";
    } else {
      productCards[i].style.display = "none";
    }
  }
});

// Tag filter
tagFilter.addEventListener("keyup", () => {
  let txtValue;
  let filter = tagFilter.value.toUpperCase();
  li = tagList.getElementsByTagName("li");

  // Loop through all tags and hide those which don't match the search query
  for (i = 0; i < li.length; i++) {
    let tagLabel = li[i].querySelectorAll(".dropdown__label");
    txtValue = tagLabel[0].textContent || tagLabel[0].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});

// In Uitleenmandje
for (let i = 0; i < productCards.length; i++) {
  let btnAdd = document.getElementById(`btn-add${i}`);

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
}

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

function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => cb(script);
  document.head.append(script);
}
