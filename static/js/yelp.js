
function getYelp() {
  var API_KEY = "NOSECRET";
  queryUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude=${destLat}&longitude=${destLng}`;


  const restaurantsContainer = document.querySelectorAll(".restaurants");

  $.ajax({
    url: queryUrl,
    method: 'GET',
    // crossDomain: true,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + API_KEY);
    },
  }).then(function(response) {
      
      for (i=0; i<restaurantsContainer.length;i++) {
        restaurantsContainer[i].innerHTML = "";
        const restaurantName = response.businesses[i].name;

        var nameCont = document.createElement("p");
        nameCont.textContent = restaurantName;
        restaurantsContainer[i].append(nameCont);

        var imgCont = document.createElement("img");
        imgCont.setAttribute("src", response.businesses[i].image_url);
        imgCont.setAttribute("class", "food-images");

        restaurantsContainer[i].append(imgCont);

        var phoneCont = document.createElement("p");
        phoneCont.setAttribute("class", "phone-num");
        phoneCont.textContent = response.businesses[i].display_phone;
        restaurantsContainer[i].append(phoneCont);
        const buttonMoreInfo = document.createElement("a");
        buttonMoreInfo.textContent = "More Info";
        buttonMoreInfo.setAttribute("class", "more-info");
        buttonMoreInfo.href = response.businesses[i].url;
        restaurantsContainer[i].append(buttonMoreInfo);





      }

  });
};
