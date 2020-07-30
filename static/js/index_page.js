var source;
var destination;
var dateFrom;
var dateTo;

$("document").ready(function() {
    var now = new Date();
    var later = new Date(JSON.parse(localStorage.getItem("location-gathered-at")));

    var APIKey = "4329b9a304464e3aaf6df7df53ecd8b3";
    
    function getLocation() {
      // Get user's current location using Geolocation
      later = new Date();
      localStorage.setItem("location-gathered-at", JSON.stringify(later));
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(parsePosition);
      } else {
        alert("Geolocation is not supported by your browser!!");
      }
    }
  
    function parsePosition(position) {
      lt = position.coords.latitude;
      ln = position.coords.longitude;
      localStorage.setItem("mylat", lt);
      localStorage.setItem("mylon", ln);
      let cityName = getTownName(position.coords.latitude, position.coords.longitude)

    }

    var diff = Math.abs(later - now);
    var timeDiff = Math.ceil(diff/(1000*60));
    if (timeDiff > 10) {
      getLocation();
    }
    else {
      $("#source-town-input").val(localStorage.getItem("source-town"));
      $("#destination-town-input").val(localStorage.getItem("destination-town"));
    }

    function alertUser(alertToShow) {
      $(".modal-content").text(alertToShow);
      $(".modal").addClass("is-active");
    }
    
    function getTownName(lat, lon) {

      // Convert user's lat lon into town name using openweather API;

        // var queryURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${APIKey}&lat=${lat}&lon=${lon}`;
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
        $.ajax({
          url: queryURL,
          method: "GET"
          })
          .then(function(response) {
            $("#source-town-input").val(response.city.name + ", " + response.city.country);
            console.log(queryURL);
            console.log(response);
            source = $("#source-town-input").val();
            destination = $("#destination-town-input").val();
    
          })
    
    
      }
    $("#search-button").on("click", function(event) {

      // When search-button clicked, save input values and call result.html

      event.preventDefault();
      source = $("#source-town-input").val();
      destination = $("#destination-town-input").val();
      dateFrom = $("#date-from").val();
      dateTo = $("#date-to").val();
      if (!source || !destination || !dateFrom || !dateTo) {
        if (!source) {
          alertUser("Please enter the source town name");
        }
        else if (!destination) {
          alertUser("Please enter the destination town name");
        }
        else if (!dateFrom) {
          alertUser("Please enter the travel start date");
        }
        else if (!dateTo) {
          alertUser("Please enter the travel end date");
        }
      }
      else {
          localStorage.setItem("source-town", $("#source-town-input").val());
          localStorage.setItem("destination-town", $("#destination-town-input").val());
          localStorage.setItem("date-from", $("#date-from").val());
          localStorage.setItem("date-to", $("#date-to").val());
          window.location.href = "result.html";
      }

    })

    $(".result-section").on("click", function(event) {
      console.log(event.target.textContent);
      if (event.target.textContent === "5-Day Forecast") {
        $(".collapse-container-weather").toggleClass("closed-section");
      }
      else if (event.target.textContent === "Transportation") {
        $(".collapse-container-transport").toggleClass("closed-section");
      }
    })

    $(".modal-close-button").on("click", function() {
      $(".modal").removeClass("is-active");
    })
})