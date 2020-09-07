
const iconElement = document.querySelector(".location p");
const tempElement = document.querySelector(".temperature-degree ");
const descElement = document.querySelector(".temperature-description ");
const locationElement = document.querySelector(".location-timezone");



const weather = {};

weather.temperature = {
    unit : "celsius"
}


const KELVIN = 273;

const key = "e8003f39a5b6d5de6a7e9e60aadf4830";


navigator.geolocation.getCurrentPosition(setPosition);



function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}




function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            return response.json();
           
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            console.log(weather);
        })
        .then(function(){
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
   iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        });
}




function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}


tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

