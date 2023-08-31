var userInput = document.querySelector('#form');
var languageButtonsEl = document.querySelector('#language-buttons');
var cityInput = document.querySelector('#city');
var dataContainer = document.querySelector('#data-container');
var dataSearched = document.querySelector('#city-search');

var userSubmit = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();

  if (city) {
    getWeather(city);
    dataContainer.textContent = '';
    cityInput.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getWeather = function (place) {
  var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=02a7b6b8e73b5f959b18d22551b1f45b';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, place);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};



userInput.addEventListener('submit', userSubmit);
