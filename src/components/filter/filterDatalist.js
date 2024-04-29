let selectedOptions = []; // array voor opgelagen filter items

function showOptions() {
	const filters = ['camera 1', 'camera 20', 'capibara 1']; // Temp list vervangen door SQL database?

	const input = document.getElementById('search-bar');
	const filterValue = input.value.toLowerCase();
	const datalist = document.getElementById('filters');

	datalist.innerHTML = ''; // Maakt de datalist leeg

	filters.forEach((optionValue) => {
		if (optionValue.toLowerCase().includes(filterValue)) {
			const option = document.createElement('option');
			option.value = optionValue;
			datalist.appendChild(option);
		}
	});
}

function selectOption() {
	const selectedOption = document.getElementById('search-bar').value;

	// Voegt het geselecteerde item toe aan een array voor later gebruik
	if (selectedOption && !selectedOptions.includes(selectedOption)) {
		selectedOptions.push(selectedOption);
		showSelectedOptions(); // Laat filter items zien
		document.getElementById('search-bar').value = ''; // Maakt de input terug leeg
	}
}

document.getElementById('search-bar').addEventListener('change', selectOption);

function deleteOption(option) {
	const index = selectedOptions.indexOf(option);
	if (index !== -1) {
		// Gaat het item verwijderen op basis van de index in da array
		selectedOptions.splice(index, 1);
		showSelectedOptions(); // Laat de items terug zien
	}
}

function showSelectedOptions() {
	const selectedOptionsElement = document.getElementById('selected-options');

	selectedOptionsElement.innerHTML = '';

	selectedOptions.forEach((option) => {
		const optionDiv = document.createElement('div');

		optionDiv.textContent = option;
		optionDiv.classList.add('selected-option'); // Voegt het filter item toe aan een div

		optionDiv.addEventListener('click', () => {
			// OnClick event voor het vewijderen van een filter item
			deleteOption(option);
		});

		selectedOptionsElement.appendChild(optionDiv);
	});
}
