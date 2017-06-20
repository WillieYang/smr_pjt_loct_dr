var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// function to return JSON data and status code.
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// functions to limit the results of distance
// using IIFE to wrap the code
var theEarth = (function(){

	var earthRadius = 6371;

	var getDistanceFromRadians = function(rads){
		return parseFloat(rads * earthRadius);};

	var getRadiansFromDistance = function(distance){
		return parseFloat(distance / earthRadius);};

	return {
		getDistanceFromRadians: getDistanceFromRadians,
		getRadiansFromDistance: getRadiansFromDistance
	};
})();

// create
module.exports.locationsCreate = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// get 
module.exports.locationsListByDistance = function(req, res){
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	console.log("lng:" + lng);
	console.log("lat:" + lat);
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	console.log("coordinates:" + point.coordinates[0]);
	var geoOptions = {
		spherical: true,
		maxDistance: theEarth.getRadiansFromDistance(20),
		num: 10 
	};
	Location.geoNear(point, geoOptions, function(err, results, stats){
		var locations = [];
		console.log("Geo Results:" + results);
		console.log("Geo stats:" + stats);
		results.forEach(function(loc){
			locations.push({
				distance: theEarth.getDistanceFromRadians(loc.dis),
				name: loc.obj.name,
				address: loc.obj.address,
				rating: loc.obj.rating,
				facilities: loc.obj.facilities,
				_id: loc.obj._id
			});
		});
		sendJsonResponse(res, 200, locations);
	});
};

// get
module.exports.locationsReadOne = function(req, res){
	 if (req.params && req.params.locationid) {
	    Location
	      .findById(req.params.locationid)
	      .exec(function(err, location) {
	        if (!location) {
	          sendJsonResponse(res, 404, {
	            "message": "locationid not found"
	          });
			  return;
	        } else if (err) {
	          console.log(err);
	          sendJsonResponse(res, 404, err);
	          return;
	        }
	        console.log(location);
	        sendJsonResponse(res, 200, location);
	      });
	  } else {
	    console.log('No locationid specified');
	    sendJsonResponse(res, 404, {
	      "message": "No locationid in request"
	    });
	  }
	};

// put
module.exports.locationsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// delete
module.exports.locationsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};