const inputbox = document.getElementById("inputbox");
const searchBtn = document.getElementById("searchBtn")
const temperature= document.getElementById("temperature")
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const weather_img = document.querySelector(".weather-img");
const description = document.querySelector(".description");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");
const input_box_h1 = document.querySelector(".input-box-h1")





async function checkweather (city){
    const api_key = "5ec50c554139f82c3b7ba2ba2790610b"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === '404'){
        location_not_found.style.display = "flex"
        weather_body.style.display = "none"
        console.log("error");
        return
    }else if(weather_data.cod != '404'){
        location_not_found.style.display = "none"
        weather_body.style.display = "flex"
    }

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15 )}<sup>°C</sup>`
    description.innerHTML = `${weather_data.weather[0].description}`

    humidity.innerHTML = `${weather_data.main.humidity}%`

    wind_speed.innerHTML =` ${weather_data.wind.speed}Km/H`

    switch(weather_data.weather[0].main){
        case "Clouds":
            weather_img.src = "/image/cloud.png"
            break;
        case "Clear":
            weather_img.src = "/image/clear.png"
            break;
        case "Rain":
            weather_img.src = "/image/rain.png"
            break;
        case "Mist":
            weather_img.src = "/image/rain.png"
            break;
        case "Snow":
            weather_img.src = "/image/snow.png"
            break;
    }
    console.log(weather_data)
}


searchBtn.addEventListener('click',()=>{
    checkweather(inputbox.value)
    input_box_h1.innerHTML = inputbox.value 
    input_box_h1.style.opacity = "1"
    inputbox.value = ""

})

function clickPress (event){
    if(event.keyCode == 13){
        checkweather(inputbox.value)
    input_box_h1.innerHTML = inputbox.value 
    input_box_h1.style.opacity = "1"
    inputbox.value = ""
    }
}
