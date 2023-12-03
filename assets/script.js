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

function createB () { 
    console.log(allCities)
    for (var i = 0; i <allCities.length; i++){
        var cityB = document.createElement("button")
        cityB.textContent = allCities[i]
        cityB.setAttribute("value", allCities[i])
        cityB.onclick = function(){
          forcast(this.value)
        }
        document.querySelector(".previous-cities").appendChild(cityB)
    }
}
createB()

function displayF (weatherArray, searchCity, data) {
    document.querySelector(".container-cards").innerHTML = ""
    for (var i = 0 ; i < weatherArray.length ; i ++) {
        var weatherLi = data.list
        var icon = document.createElement("img")
        icon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherLi[i].weather[0].icon + "@2x.png")
        var cardD = document.createElement("div")
        cardD.setAttribute("class", "card")
        cardD.setAttribute("style", "width:18rem")
        var cardB = document.createElement("div")
        cardB.setAttribute("class", "card-body")
        var ulCard = document.createElement("ul")
        ulCard.setAttribute("class", "ulCard")
    
        var liCardN = document.createElement("li")
        liCardN.setAttribute("class", "liName")
        liCardN.innerText = searchCity
    
        var liCardT = document.createElement("li")
        liCardT.setAttribute("class", "liTemp")
        liCardT.innerText = "Temperature: " + weatherArray[i].main.temp
  
        var liCardW = document.createElement("li")
        liCardW.setAttribute("class", "liWind")
        liCardW.innerText = "Wind Speed: " + weatherArray[i].wind.speed + " mph"
   
        var liCardH = document.createElement("li")
        liCardH.setAttribute("class", "liHumidity")
        liCardH.innerText = "Humidity " + weatherArray[i].main.humidity + "%"
      
        cardD.appendChild(cardB)
        cardB.appendChild(ulCard)
        ulCard.append(icon, liCardN, liCardT, liCardW, liCardH)
        document.querySelector(".container-cards").appendChild(cardD)
    }
}

function currentWeather (weatherobj){

    document.querySelector(".container-info").innerHTML = ""

    var pN = document.createElement("p")
    pN.textContent = weatherobj.name
  
    var pT = document.createElement("p")
    pT.textContent = "Temperature: " + weatherobj.temp

    var pW = document.createElement("p")
    pW.textContent = "Wind: " + weatherobj.wind

    var pH = document.createElement("p")
    pH.textContent = "Humidity: " + weatherobj.humidity
    document.querySelector(".container-info").append(pN, pT, pW, pH)
}