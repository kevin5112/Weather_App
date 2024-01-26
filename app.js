// Aware that apikey is public.  Just for testing purposes and weather api is free.
let apiKey = '6b8d1c54b399477e985210112242501';
let apiUrl = 'https://api.weatherapi.com/v1/current.json';

async function getWeatherData(city) {
  try {
    console.log(`city in weather data function: ${city}`);
    let queryURL = apiUrl + '?key=' + apiKey + '&q=' + city;
    console.log(queryURL);
    const response = await fetch(queryURL, { mode: 'cors' });
    const data = await response.json();
    let cityData = data.location.name;
    let tempF = data.current.temp_f;
    return { cityData, tempF };
  } catch (error) {
    console.log(error);
  }
}

function initializeButtons() {
  let searchBtn = document.getElementById('searchBtn');
  searchBtn.onclick = searchLocation;
}

function getUserInput() {
  let locationSearchBar = document.getElementById('locationSearchBar');
  let userInput = locationSearchBar.value.replace(/ /g, '-');
  return userInput;
}

function searchLocation() {
  let userInput = getUserInput();
  console.log(userInput);
  renderWeatherData(userInput);
}

function renderWeatherData(city = 'london') {
  initializeButtons();
  console.log(city);
  let weather = document.getElementById('weather');

  let weatherInfo = getWeatherData(city).then((data) => {
    // console.log(data.city);
    // console.log(data.tempF);
    weather.textContent = `${data.cityData}, ${data.tempF} °F`;
  });
}

renderWeatherData();
