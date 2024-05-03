const searchBar = document.getElementById("search-bar");
const tagFilter = document.getElementById("tag-filter");
const tagDropdown = document.getElementById("tag-filter-dropdown");
const tagList = document.getElementById("tag-filter-list");
let li = tagList.getElementsByTagName("li");
let tags = [
  "vr",
  "video",
  "camera",
  "camera",
  "camera",
  "camera",
  "camera",
  "camera",
  "camera",
  "camera",
  "camera",
  "camera",
];
let selectedTags = [];
const testList = document.getElementById("test");
const testListItems = testList.querySelectorAll("li");

tags.forEach((tag) => {
  let filterItem = document.createElement("li");
  filterItem.classList.add("filter-list__item");

  let cbItem = document.createElement("input");
  cbItem.type = "checkbox";
  cbItem.classList.add("dropdown__checkbox");

  let customCb = document.createElement("span");
  customCb.classList.add("dropdown__checkmark");

  let cbLabel = document.createElement("label");
  cbLabel.innerText = tag;
  cbLabel.classList.add("dropdown__label");

  cbLabel.appendChild(cbItem);
  cbLabel.appendChild(customCb);
  filterItem.appendChild(cbLabel);
  tagList.appendChild(filterItem);

  cbItem.addEventListener("change", () => {
    if (cbItem.checked) {
      addTag(tag);
    } else {
      removeTag(tag);
    }
    updateTags();
  });
});

// Add tag to filter array
function addTag(tag) {
  selectedTags.push(tag);
}

// Remove tag from filter array
function removeTag(tag) {
  let index = selectedTags.indexOf(tag);
  if (index > -1) {
    selectedTags.splice(index, 1);
  }
}

// Read all values of filter array and update accordingly
function updateTags() {
  if (selectedTags.length == 0) {
    testListItems.forEach((item) => {
      item.style.display = "";
    })
  } else {
    testListItems.forEach((item) => {
      if (selectedTags.includes(item.innerText.toLowerCase())) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }
}

// Search bar filter
// TODO: Change li to item you want to hide/show
searchBar.addEventListener("keyup", () => {
  // Declare variables
  let txtValue;
  let filter = searchBar.value.toUpperCase();
  li = tagList.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});

// Tag filter
tagFilter.addEventListener("keyup", () => {
  // Declare variables
  let txtValue;
  let filter = tagFilter.value.toUpperCase();
  li = tagList.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});
