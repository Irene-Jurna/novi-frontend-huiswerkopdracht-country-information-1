import axios from "axios";

const countryList = document.getElementById('countries');

function colorCountries(region) {
    let continentColor = '';

    switch (region) {
        case 'Asia':
            continentColor = 'continent-list-asia';
            break;
        case 'Americas':
            continentColor = 'continent-list-americas';
            break;
        case 'Africa':
            continentColor = 'continent-list-africa';
            break;
        case 'Europe':
            continentColor = 'continent-list-europe';
            break;
        case 'Oceania':
            continentColor = 'continent-list-oceania';
            break;
        default:
            continentColor = 'continent-list-default';
    }
    return continentColor;
};

async function fetchCountries() {
    try {
        // het request maken
        const response = await axios.get('https://restcountries.com/v2/all');
        console.log(response.data);

        response.data.sort((a, b) => a.population - b.population);

        const listItems = response.data.map(({name, population, region, flag}) => {
            let color = colorCountries(region);
            return `<li class="${color}"><img src="${flag}" alt="Flag" width="25"> ${name}</li>
            <li class="countries-list">Has a population of ${population} people</li>`
        });
        countryList.innerHTML = listItems.join('');

    } catch (e) {
        // de errors afvangen
        console.error(e);
    }
};

fetchCountries();


//testen voor 1 entry
// countryList.innerHTML = `
// <li> <span> ${response.data[0]} </span> <span> Has a population of ${response.data[0]} people</span></li>
// `;