const searchBar = document.getElementById("search-bar");
const tagFilter = document.getElementById("tag-filter");
const tagDropdown = document.getElementById("tag-filter-dropdown");
const tagList = document.getElementById("tag-filter-list");
let li = tagList.getElementsByTagName("li");
let tags = ["vr", "video", "camera"];

tags.forEach((tag) => {
  let filterItem = document.createElement("li");
  filterItem.classList.add("filter-list__item");
  filterItem.innerText = tag;

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
