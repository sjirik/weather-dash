let apiKey = `02a7b6b8e73b5f959b18d22551b1f45b`
let userInput = document.querySelector("#search-input")
let searchB = document.querySelector("#search-button")
var allCities = JSON.parse(localStorage.getItem("Cities"))||[]

searchB.addEventListener("click", function (event) {
    let searchCity = userInput.value
    event.preventDefault()
    forcast(searchCity)
});

function forcast (searchCity) {
if (searchCity === "" || searchCity === undefined || searchCity === null) {
    document.getElementById("city-alert").removeAttribute("class")
    setTimeout(function(){
        document.getElementById("city-alert").setAttribute("class", "hide")
    }, 1500)
    return ;
}
document.querySelector(".right").classList.remove("hide")


let url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=${apiKey}`
fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        var cityName = data.city.name
        if (!allCities.includes(cityName)){
            allCities.push(cityName)
            localStorage.setItem("Cities", JSON.stringify(allCities))
        }
        var cardArray = []
        for (var i =0; i<data.list.length; i++){
            var time = data.list[i].dt_txt.split(" ")[1]
            if (time === "12:00:00") {
                cardArray.push(data.list[i])
            }
        }
        displayF(cardArray, cityName, data)
        var weather = data.list[0]
        var currentInfo = { temp: weather.main.temp, wind: weather.wind.speed, humidity: weather.main.humidity, name:data.city.name}
        currentWeather(currentInfo)
    });
}

