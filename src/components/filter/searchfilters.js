const datalist = document.getElementById("Filters");

function editDatalist(){
    const newOptions = [ 'camera 50', 'flash 3', 'Keylight 2']
}

while(datalist.firstChild){
    datalist.removeChild(datalist.firstChild)
}

newOptions.forEach(Option => {
    const newOption = document.createElement("option");
    newOption.value = option;
    datalist.appendChild(newOption);
});

editDatalist();




/*const Filters =  [
'Camera 1',
'Micro 1 ', 
'kabel 3', 
'Camera 4' 
];

function filterFunction(){
    const input = document.getElementById("search-bar");
    const filterOptions = document.getElementById("filterOptions");
    const realFilters = document.getElementById("Filters")
    const inputValue = input.ariaValueMax.toLowerCase();
}

while (filterOptions.firstChild){
    filterOptions.removeChild(filterOptions.firstChild);
}

Filters.forEach(filter => {
    if (filter.toLowerCase().includes(inputValue)){
        const option = document.createElement("dic");
        option.classList.add("filter-option");
        option.textContent= filter;
        option.addEventListener('click',function(){
            input.value = filter;
            filterOptions.style.display = "none";
        });
        filterOptions.appendChild(option);
    }
})

if (inputValue){
    filterOptions.style.display ="Block";
} else {
    filterOptions.style.display = "none";
}
*/