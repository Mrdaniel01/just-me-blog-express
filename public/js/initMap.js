const map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.477636, lng: -122.145610 },
        zoom: 8
        
    });
}