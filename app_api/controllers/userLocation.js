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