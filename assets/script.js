var userInput = document.querySelector('#form');
var cityInput = document.querySelector('#city');
var dataContainer = document.querySelector('#data-container');
var dataSearched = document.querySelector('#city-search');



var userSubmit = function (event) {
  event.preventDefault();
  var selectedCity = cityInput.value.trim();
  if (selectedCity) {
    getWeather(selectedCity);
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


var displayWeather = function (cities, searchTerm) {
  if (cities.length === 0) {
    dataContainer.textContent = 'Please enter a real City';
    return;
  }

  dataSearched.textContent = searchTerm;

  for (var i = 0; i < cities.length; i++) {
    var cityName = cities[i].city.name;

    var cityEl = document.createElement('div');
    cityEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = cityName;

    cityEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    cityEl.appendChild(statusEl);

    dataContainer.appendChild(cityEl);
  }
};

userInput.addEventListener('submit', userSubmit);
