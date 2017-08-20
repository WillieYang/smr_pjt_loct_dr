var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// function to return JSON data and status code.
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// location in locationlist create
module.exports.locationsCreate = function(req, res){
	console.log("name: " + req.body.name);
	console.log("address: " + req.body.address);

	Location.create({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		place_id: req.body.place_id,
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: req.body.openingTimes,
		rating: req.body.rating
	}, function(err, location){
		if (err) {
			sendJsonResponse(res, 404, err);
		}else {
			sendJsonResponse(res, 201, location);
		}
	}); console.log("facilities:" + req.body.facilities.split(","));
};

// get location in locationlist by place_id
module.exports.locationsReadOne = function(req, res){
	 if (req.params && req.params.locationid) {
	    Location
	      .findOne({'place_id': req.params.locationid})
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

// update the location information, reference key: place_id
module.exports.locationsUpdateOne = function(req, res){
	if (!req.params.locationid) {
		sendJsonResponse(res, 404, {
			"message": "Not found, locationid required"
		});
		return;
	}
	Location
		.findOne({'place_id': req.params.locationid})
		.select('-reviews, -rating')
		.exec(
			function(err, location){
				if (!location){
					sendJsonResponse(res, 404, {
						"message": "locationid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				location.name = req.body.name;
				location.address = req.body.address;
				location.facilities = req.body.facilities;
				location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
				location.openingTimes = req.body.open_or_not;
				location.save(function(err, location){
					if (err) {
						sendJsonResponse(res, 404, err);
					} else {
						sendJsonResponse(res, 200, location);
					}
				});
			}
		);
};

// delete
module.exports.locationsDeleteOne = function(req, res){
	var locationid = req.params.locationid;
	if (locationid) {
		Location
			.findByIdAndRemove(locationid)
			.exec(function(err, location){
				if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 204, null);
			}
		);
	} else {
		sendJsonResponse(res, 404, {
			"message": "No locationid"
		});
	}	
};