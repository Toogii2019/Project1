
var lt = -34.397;
var ln = 150.644;


function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lt, lng: ln },
    zoom: 8
    });
    let marker = new google.maps.Marker({
    position: { lat: lt, lng: ln },
    map: map
    });
}