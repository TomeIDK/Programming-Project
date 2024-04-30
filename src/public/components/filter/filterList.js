var searchBar = document.getElementById('search-bar');

function myFilters() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search-bar');
  filter = input.value.toUpperCase();
  ul = document.getElementById("filters");
  li = ul.getElementsByTagName('li');

  
  if(filter.trim() !== ""){
    ul.style.display ="block";
  } else{
    ul.style.display ='none'
  }


  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

document.addEventListener('DOMContentLoaded',function(){
  var filterOptions = document.querySelectorAll('#Filters li a');
   

  filterOptions.forEach(function(option){ 
    option.addEventListener('click',function(e){
      e.preventDefault();
     
      var selectedOption = this.textContent.trim();
      document.getElementById('search-bar').value = selectedOption;
      myFilters();
    });
  });
});



searchBar.addEventListener('input',function(){
  myFilters();
});

searchBar.addEventListener('focus',function(){
  showSelectedOption();
});

searchBar.addEventListener('blur', function(){
  hideSelectedOption();
});

function showSelectedOption(){
  var selectedOption = searchBar.value.trim();
  if (selectedOption !== ""){
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#";
    a.textContent = selectedOption;
    a.classList.add("selected-option");
    li.appendChild(a);
    document.getElementById("Filters").appendChild(li);

    a.addEventListener('click', function(e){
      e.preventDefault();
      searchBar.value ="";
      searchBar.focus();
      li.parentNode.removeChild(li);
      myFilters();
    });
  }
}

function hideSelectedOption(){
  var selectedOption = searchBar.value.trim();
  if (selectedOption === ""){
    var selectedOptionElement = document.querySelector('.selected-option');

    if (selectedOptionElement){
      selectedOptionElement.parentNode.removeChild(selectedOptionElement);
    }
  }
}






