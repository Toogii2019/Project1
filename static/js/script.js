var source;
var destination;
var dateFrom;
var dateTo;

$("document").ready(function() {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    function getLocation() {
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(parsePosition);
      } else {
        alert("Geolocation is not supported by your browser!!");
      }
    }
  
    function parsePosition(position) {
      // console.log(position.coords.latitude, position.coords.longitude);
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
    
            // console.log(response);
            $("#source-town-input").val(response.city.name + ", " + response.city.country);
            source = $("#source-town-input").val();
            destination = $("#destination-town-input").val();
    
          })
    
    
      }
    $("#search-button").on("click", function(event) {
        event.preventDefault();
        source = $("#source-town-input").val();
        destination = $("#destination-town-input").val();
        dateFrom = $("#date-from").val();
        dateTo = $("#date-to").val();
        console.log(dateFrom); 
        console.log(dateTo);
        if (!source || !destination || !dateFrom || !dateTo) {
            alert("Please complete the form before searching")
        }
        else {

            localStorage.setItem("source-town", $("#source-town-input").val());
            localStorage.setItem("destination-town", $("#destination-town-input").val());
            localStorage.setItem("date-from", $("#date-from").val());
            localStorage.setItem("date-to", $("#date-to").val());
            window.location.href = "city.html";
        }

    })
})