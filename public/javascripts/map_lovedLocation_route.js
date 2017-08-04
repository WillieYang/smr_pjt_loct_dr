console.log("lat in included js file:" + typeof targetlat);
console.log("lng in included js file:" + typeof targetlng);
function initMap() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("posLat:" + pos.lat);

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: (pos.lat+ targetlat)/2, lng: (pos.lng+ targetlng)/2},
        mapTypeId: 'terrain'
      });

      function calcRoute() {
          var start = new google.maps.LatLng(pos.lat, pos.lng);
          var end = new google.maps.LatLng(targetlat, targetlng);
          var bounds = new google.maps.LatLngBounds();
          bounds.extend(start);
          bounds.extend(end);
          map.fitBounds(bounds);
          var request = {
              origin: start,
              destination: end,
              travelMode: google.maps.TravelMode.WALKING
          };
          directionsService.route(request, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                  directionsDisplay.setMap(map);
              } else {
                  alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
              }
          });
      }
      calcRoute();
    });
  }
}
