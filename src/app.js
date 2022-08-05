import axios from "axios";

console.log('Hallo daar!');

const countryList = document.getElementById('countries');

async function fetchCountries() {
    try {
        // het request maken
        const response = await axios.get('https://restcountries.com/v2/all');
        // console.log(response.data[0].languages[1].name);

        // countryList.innerHTML = `
        // <li>Een van de talen is: ${response.data[0].languages[1].name} </li>
        // `;
    } catch(e) {
        // de errors afvangen
        console.error(e);
    }
}

fetchCountries();