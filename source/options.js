import optionsStorage from './options-storage';

optionsStorage.syncForm('#options-form');

let rangeInputs;
let numberInputs;

async function init() {
	const opts = await optionsStorage.getAll();
	console.log(opts.custom);
	const tbody = document.querySelector('.color-inputs');
	const template = document.querySelector('#speedrow');

	for (const x of Object.values(opts.custom)) {
		const clone = template.content.cloneNode(true);
		const title = clone.querySelector('#title');
		title.textContent = x.name;
		tbody.append(clone);
	}

	rangeInputs = [...document.querySelectorAll('input[type="range"]')];
	numberInputs = [...document.querySelectorAll('input[type="number"]')];

	for (const input of rangeInputs) {
		// Input.addEventListener('input', updateColor);
		input.addEventListener('input', updateInputField);
	}
}

function updateInputField(event) {
	numberInputs[rangeInputs.indexOf(event.currentTarget)].value =
		event.currentTarget.value;
}

window.addEventListener('load', init);
