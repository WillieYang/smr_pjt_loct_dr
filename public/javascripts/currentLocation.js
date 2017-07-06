 function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);  
    } else {
        alert("Your browser or device doesn't support Geolocation");
    }
}

// If we have a successful location update
function onGeoSuccess(position)
{
    document.getElementById("Latitude").value =  position.coords.latitude;
    console.log("Current:" + position.coords.latitude);
    document.getElementById("Longitude").value = position.coords.longitude;
}

// If something has gone wrong with the geolocation request
function onGeoError(event)
{
    alert("Cannot get the position of current user!");
}

getLocation();