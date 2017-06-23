var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// function to return JSON data and status code.
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// functions to limit the results of distance
// using IIFE to wrap the code
// this method might be useless for the format of coordinates is GeoJSON.
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
	console.log("openingDays:" + req.body.days1);
	console.log("openingTimes:" + req.body.opening1);
	console.log("closingTimes:" + req.body.closing1);

	Location.create({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: [{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1,
		}, {
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2,
		}]
	}, function(err, location){
		if (err) {
			sendJsonResponse(res, 404, err);
		}else {
			sendJsonResponse(res, 201, location);
		}
	});
};

// get 
module.exports.locationsListByDistance = function(req, res){
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	console.log("lng:" + lng);
	console.log("lat:" + lat);
	var point = {
		type: "Point",
		coordinates: [lng, lat] // Form of GeoJSON Point.
	};
	console.log("coordinates:" + point.coordinates[0]);
	var geoOptions = {
		spherical: true,
		maxDistance: 300,
		num: 10 
	};
	if (!lng || !lat) {
		sendJsonResponse(res, 404, {
			"message": "longitude and latitude query are required"
		});
		return;
	}
	Location.geoNear(point, geoOptions, function(err, results, stats){
		var locations = [];
		console.log("Geo Results:" + results);
		console.log("Geo stats:" + stats);

		if (err){
			sendJsonResponse(res, 404, err);
		} else {
		  results.forEach(function(loc){
			locations.push({
				distance: loc.dis,
				name: loc.obj.name,
				address: loc.obj.address,
				rating: loc.obj.rating,
				facilities: loc.obj.facilities,
				_id: loc.obj._id
			});
		});
		sendJsonResponse(res, 200, locations);			
		}
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