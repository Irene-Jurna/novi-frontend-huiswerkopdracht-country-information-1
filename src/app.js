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


// PART 2

const countryData = document.getElementById('country-searcher-output');

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchName);

function searchName(e) {
    e.preventDefault();

    const searchInput = document.getElementById('search-input');

    searchCountries(searchInput.value);

    searchInput.value = '';

}


async function searchCountries(name) {
    try {
        const output = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = output.data[0];
        console.log(country);

        countryData.innerHTML =
            `<span> 
            <h2><img src="${country.flag}" width=50 />${country.name}</h2> 
            <p>${country.name} is situated in ${country.subregion}. 
            It has a population of ${country.population} people.</p>
            <p>The capital is ${country.capital} ${countryCurrencies(country.currencies)}.</p>
            <p>They speak ${countryLanguages(country.languages)}</p>
            </span>`

    } catch (e) {
        countryData.innerHTML =
            `<p>Error. ${name} is een onbekend land. Vul een geldige zoekopdracht in. </p>`
    }
}

function countryCurrencies(currencies) {
    let result = 'and you can pay with ';

    if (currencies.length === 2) {
        return result + `${currencies[0].name} and ${currencies[1].name}`
    }
    return result + `${currencies[0].name}`;
}

function countryLanguages(languages) {
    let ret = ''
    for (let i = 0; i < languages.length; i++) {
        if (languages.length === 1) {
            ret = languages[i].name;
            break;
        }
        if (i === languages.length - 1) {
            ret += ' and ';
        } else if (i > 0) {
            ret += ', ';
        }
        ret += languages[i].name;
    }
    return ret;
}