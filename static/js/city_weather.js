var APIKey = "4329b9a304464e3aaf6df7df53ecd8b3";
let cityName = localStorage.getItem("destination-town"); 
getWeather();
function getWeather() {

    //  Using saved city name, execute a 5-day forecast get request
    let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;
            
    // AJAX call
    $.ajax({
    url: forecastQueryURL,
    method: "GET",
    })
        //store data
        .then(function(response){

            // console.log(forecastQueryURL);
            // console.log(response);

            // Get Date
            const currentDate = new Date(response.dt*1000);
            // console.log(currentDate);

            const forecast = document.querySelectorAll(".forecast");
            for (i=0; i<forecast.length; i++) {
                forecast[i].innerHTML = "";
                const forecastIndex = i*8 + 4;
                const forecastDate = new Date(response.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateP = document.createElement("p");
                forecastDateP.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateP.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecast[i].append(forecastDateP);
                const forecastWeather = document.createElement("img");
                forecastWeather.setAttribute("src","https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeather.setAttribute("alt",response.list[forecastIndex].weather[0].description);
                forecast[i].append(forecastWeather);
                const forecastTemp = document.createElement("p");
                forecastTemp.innerHTML = "Temp: " + response.list[forecastIndex].main.temp + " ºF";
                forecast[i].append(forecastTemp);
                const forecastHumidity = document.createElement("p");
                forecastHumidity.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
                forecast[i].append(forecastHumidity);
                
            }

        });  
        
};