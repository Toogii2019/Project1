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
      console.log(position.coords.latitude, position.coords.longitude);
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
    
          })
    
    
      }
})