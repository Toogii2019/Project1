var source;
var destination;

$("document").ready(function() {
    var APIKey = "OPENWEATHER_API_KEY";

    function getLocation() {
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(parsePosition);
      } else {
        alert("Geolocation is not supported by your browser!!");
      }
    }
  
    function parsePosition(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      lt = position.coords.latitude;
      ln = position.coords.longitude;
      localStorage.setItem("mylat", lt);
      localStorage.setItem("mylon", ln);

    //   initMap();
      let cityName = getTownName(position.coords.latitude, position.coords.longitude)
    //   $(".source-town-input").text()

    }
    getLocation()

    function getTownName(lat, lon) {
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${APIKey}&lat=${lat}&lon=${lon}`;
    
        $.ajax({
          url: queryURL,
          method: "GET"
          })
          .then(function(response) {
    
            console.log(response);
            console.log
            $("#source-town-input").val(response.city.name + ", " + response.city.country);
            source = $("#source-town-input").val();
            destination = $("#destination-town-input").val();
    
          })
    
    
      }
    $("#search-button").on("click", function(event) {
        event.preventDefault();
        source = $("#source-town-input").val();
        destination = $("#destination-town-input").val();
        
        if (!source || !destination) {
            alert("Please complete the form before searching")
        }
        else {

            localStorage.setItem("source-town", $("#source-town-input").val());
            localStorage.setItem("destination-town", $("#destination-town-input").val());

            window.location.href = "city.html";
        }

    })
})