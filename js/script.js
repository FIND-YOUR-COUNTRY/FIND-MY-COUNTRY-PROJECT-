document.getElementById('search').addEventListener('click', function () {
    const countryName = document.getElementById('countryinput').value.trim();
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            document.getElementById('flag').src = country.flags.png; 
            document.getElementById('name').textContent = country.name.common; 
            document.getElementById('continent').textContent = country.region; 
            document.getElementById('capital').textContent = country.capital[0]; 
            document.getElementById('population').textContent = country.population.toLocaleString(); 
            document.getElementById('language').textContent = Object.values(country.languages).join(', '); 
            document.getElementById('currency').textContent = Object.values(country.currencies)[0].name;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Country not found. Please try again.');
        });
});

document.getElementById('guessinput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const guess = event.target.value.toLowerCase();
        const correctAnswer = 'kenya'; 
        if (guess === correctAnswer) {
            alert('Correct! You guessed the country.');
        } else {
            alert('Incorrect guess. Please try again!');
        }
    }
});

document.getElementById('search').addEventListener('click', function () {
    alert('Hint: The country is in East Africa!');
});

