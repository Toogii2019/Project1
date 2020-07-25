var lt = -100;
var ln = -300;
let navigated = false;

function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lt, lng: ln },
    zoom: 8
    });
    let marker = new google.maps.Marker({
    position: { lat: lt, lng: ln },
    map: map
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    console.log(directionsService);
    directionsDisplay.setMap(map);
    calcRoute(directionsService, directionsDisplay);
}

function calcRoute(directionsService, directionsDisplay) {
    console.log("Google MAP API used!");
    let source = localStorage.getItem("source-town");
    let destination = localStorage.getItem("destination-town");
    directionsService.route({
        origin: localStorage.getItem("source-town"),
        destination: localStorage.getItem("destination-town"),
        travelMode: 'DRIVING'
    },function(response, status) {
        if (status === "OK") {
            directionsDisplay.setDirections(response);
        }
        else {
            window.alert('Direction request has failed!! - ' + status);
        }
        console.log(response);
        $("#source").text(response.request.origin.query);
        $("#destination").text(response.request.destination.query);

        $("#distance").text(response.routes[0].legs[0].distance.text);
        $("#travel-mode").text(response.request.travelMode);

    }   
    )
}

function startNavigation() {
    if (!navigated) {
        var scriptCont = $("<script async defer>");

        scriptCont.attr("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjdq56aGm-Skvn5XkX903fYDpqhda4qOo&callback=initMap");
        console.log(scriptCont);
        $("body").append(scriptCont);
        navigated = true;
    }

}