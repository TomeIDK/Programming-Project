const searchBar = document.getElementById("search-bar");
const tagFilter = document.getElementById("tag-filter");
const tagDropdown = document.getElementById("tag-filter-dropdown");
const tagList = document.getElementById("tag-filter-list");
let li = tagList.getElementsByTagName("li");
let tags = ["vr", "video", "camera", "camera", "camera", "camera", "camera", "camera", "camera", "camera", "camera", "camera"];

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
});


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


