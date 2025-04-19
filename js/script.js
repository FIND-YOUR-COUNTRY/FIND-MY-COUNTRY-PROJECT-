// Function to fetch country data from a REST API
async function fetchCountryData(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

// Event listener for the "search" button
document.getElementById('searchBtn').addEventListener('click', async () => {
    const countryName = document.getElementById('countrysearchinput').value;
    if (!countryName) {
        alert('Please enter a country name.');
        return;
    }
    const countryData = await fetchCountryData(countryName);
    if (countryData) {
        document.getElementById('Flag').src = countryData.flags.svg;
        document.getElementById('name').innerText = countryData.name.common;
        document.getElementById('Continent').innerText = countryData.region;
        document.getElementById('Capital').innerText = countryData.capital ? countryData.capital[0] : 'N/A';
        document.getElementById('Population').innerText = countryData.population.toLocaleString();
        document.getElementById('Language').innerText = Object.values(countryData.languages).join(', ');
        document.getElementById('Currency').innerText = Object.keys(countryData.currencies).join(', ');
    }
});

// Function for the guessing game
async function generateRandomCountry() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    return countries[Math.floor(Math.random() * countries.length)];
}

let currentCountry;

document.getElementById('guesscountryinput').addEventListener('click', () => {
    const guess = document.getElementById('countryinput').value;
    if (!guess) {
        alert('Please enter your guess.');
        return;
    }
    if (guess.toLowerCase() === currentCountry.name.common.toLowerCase()) {
        alert('Correct! 🎉');
    } else {
        alert(`Wrong! The correct answer was ${currentCountry.name.common}.`);
    }
});

document.getElementById('hintBtn').addEventListener('click', () => {
    alert(`Hint: The country is located in ${currentCountry.region}.`);
});

document.getElementById('anothercountryinput').addEventListener('click', async () => {
    currentCountry = await generateRandomCountry();
    document.getElementById('flag').src = currentCountry.flags.svg;
});

// Initialize the guessing game
(async () => {
    currentCountry = await generateRandomCountry();
    document.getElementById('flag').src = currentCountry.flags.svg;
})();
