const searchBar = document.getElementById("search-bar");
const tagFilter = document.getElementById("tag-filter");
const tagList = document.getElementById("tag-filter-list");
const btnFilter = document.getElementById("search-bar-btn-filter");
const selectedTagsList = document.getElementById("selected-tags-list");
const tagFilterSpan = document.getElementById("tag-filter-span");
const tagCheckboxes = document.getElementsByClassName("dropdown__checkbox");
const tagLabels = Array.from(document.getElementsByClassName("dropdown__label"));

// Horizontal scroll via scroll wheel on selected tags list
selectedTagsList.addEventListener("wheel", function (e) {
  let scrollSpeed = 20;
  if (e.deltaY > 0) selectedTagsList.scrollLeft += scrollSpeed;
  else selectedTagsList.scrollLeft -= scrollSpeed;
});

// (Test) Values
let li = tagList.getElementsByTagName("li");
let selectedTags = [];
const testList = document.getElementById("test");
const testListItems = testList.querySelectorAll("li");

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
// });

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
  })
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
  })

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
  btnFilter.prepend(tagFilterSpan);
  selectedTagsList.style.display = "hidden";
  if (selectedTags.length == 0) {
    testListItems.forEach((item) => {
      item.style.display = "";
    });
  } else {
    tagFilterSpan.remove();
    selectedTagsList.style.visibility = "visible";
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

  // Loop through all list items, and hide those which don't match the search query
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

  // Loop through all list items, and hide those which don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});
