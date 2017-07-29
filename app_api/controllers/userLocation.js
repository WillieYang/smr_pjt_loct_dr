var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// create
module.exports.lovedLocationCreate = function(req, res){
	var userid = req.params.userid;
	console.log("user's loved location API--user_id:" + userid);
	if (userid) {
		User
		  .findById(userid)
		  .select('userLocation')
		  .exec(
		  	function(err, user){
		  		if (err) {
		  			sendJsonResponse(res, 400, err);
		  		} else {
		  			addUserLocation(req, res, user);
		  		}
		  	}
		  );
	} else {
		sendJsonResponse(res, 404, {
			"message": "Sorry, userid required!!!"
		});
	}
};

var addUserLocation = function(req, res, user) {
  if (!user) {
    sendJsonResponse(res, 404, "userid not found");
  } else {
	  user.userLocation.push({
	      locationName: req.body.locationName,
	      locationAddress: req.body.locationAddress,
	      place_id: req.body.place_id,
	      coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
	  });
	  user.save(function(err, user) {
	      // var thisReview;
	      if (err) {
	        sendJsonResponse(res, 400, err);
	      } else {
	      	// console.log("user.place_id: " + user.place_id);
	        // updateAverageRating(location._id);
	        // thisReview = location.reviews[location.reviews.length - 1];
	        sendJsonResponse(res, 201, user);
	      }
	   });
    }
};

// delete
module.exports.lovedLocationDelete = function(req, res){
	if (!req.params.userid || !req.params.lovedlocationid) {
		sendJsonResponse(res, 404, {
			"message": "Sorry, userid and lovedlocationid are both required"
		});
		return;
	}
	User
		.findById(req.params.userid)
		.select('userLocation')
		.exec(
			function(err, user){
				console.log("user:" + user);
	
				if (!user) {
					sendJsonResponse(res, 404, {
						"message": "userid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				if (user.userLocation && user.userLocation.length > 0) {
					if (!user.userLocation.id(req.params.lovedlocationid)) {
						sendJsonResponse(res, 404, {
							"message": "lovedLocationid not found"
						});
					} else {
						user.userLocation.id(req.params.lovedlocationid).remove();
						user.save(function(err) {
							if (err) {
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 204, null);
							}
						});
					}
				} else {

					sendJsonResponse(res, 404, {
						"message": "No userLocation to remove"
					});
				}
			}
		);
};

// get a specific locaiton by lovedLocationName
module.exports.lovedLocationGet = function(req, res){
	if (!req.params.userid || !req.params.lovedLocationName) {
		sendJsonResponse(res, 404, {
			"message": "Sorry, userid and lovedlocationid are both required"
		});
		return;
	}
	User
		.findById(req.params.userid)
		.exec(
			function(err, lovedLocation){
				console.log("lovedLocation:" + lovedLocation);
	
				if (lovedLocation.length == 0) {
					sendJsonResponse(res, 404, {
						"message": "lovedLocation not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, lovedLocation);
			}
		);
};

// get a list of loved locaiton from a specific user
module.exports.lovedLocationListGet = function(req, res){
	 if (req.params && req.params.userid) {
	    User
	      .findById(req.params.userid)
	      .exec(function(err, user) {
	        if (!user) {
	          sendJsonResponse(res, 404, {
	            "message": "userid not found"
	          });
			  return;
	        } else if (err) {
	          console.log(err);
	          sendJsonResponse(res, 404, err);
	          return;
	        }
	        console.log(user);
	        sendJsonResponse(res, 200, user);
	      });
	  } else {
	    console.log('No userid specified');
	    sendJsonResponse(res, 404, {
	      "message": "No userid in request"
	    });
	  }
};