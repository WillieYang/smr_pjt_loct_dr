console.log("lat in included js file:" + typeof targetlat);
console.log("lng in included js file:" + typeof targetlng);
function initMap() {
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

      var flightPlanCoordinates = [
        {lat: pos.lat, lng: pos.lng},
        {lat: targetlat, lng: targetlng}
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
    });
  }
}
