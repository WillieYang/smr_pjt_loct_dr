var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// function to return JSON data and status code.
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// create
module.exports.reviewsCreate = function(req, res){
	var locationid = req.params.locationid;
	if (locationid) {
		Location
		  .findById(locationid)
		  .select('reviews')
		  .exec(
		  	function(err, location){
		  		if (err) {
		  			sendJsonResponse(res, 400, err);
		  		} else {
		  			addReview(req, res, location);
		  		}
		  	}
		  );
	} else {
		sendJsonResponse(res, 404, {
			"message": "Sorry, locationid required!!!"
		});
	}
};

var addReview = function(req, res, location) {
  if (!location) {
    sendJsonResponse(res, 404, "locationid not found");
  } else {
	  location.reviews.push({
	      author: req.body.author,
	      rating: req.body.rating,
	      reviewText: req.body.reviewText
	  });
	  location.save(function(err, location) {
	      var thisReview;
	      if (err) {
	        sendJsonResponse(res, 400, err);
	      } else {
	        updateAverageRating(location._id);
	        thisReview = location.reviews[location.reviews.length - 1];
	        sendJsonResponse(res, 201, thisReview);
	      }
	   });
    }
};

var updateAverageRating = function(locationid){
	Location
		.findById()
		.select()
		.exec(
			function(err, location){
				if (!err) {
					setAverageRating();
				}
			}
		);
};

var setAverageRating = function(location){
	var i, reviewCount, ratingAverage, ratingTotal;
	if (location.reviews && locaiton.reviews.length > 0) {
		reviewCount = location.reviews.length;
		ratingTotal = 0;
		for (i = 0; i < reviewCount; i++) {
			ratingTotal = location.reviews[i].rating + ratingTotal;
		}
		ratingAverage = parseInt(ratingTotal / reviewCount, 10);
		location.rating = ratingAverage;
		location.save(function(err){
			if (err) {
				console.log(err);
			} else {
				console.log("Average rating updated to:", ratingAverage);
			}
		}); 
	}
};

// get
module.exports.reviewsReadOne = function(req, res){
	if (req.params && req.params.locationid && req.params.reviewid) {
	    Location
	      .findById(req.params.locationid)
	      .select('name reviews')
	      .exec(function(err, location) {
	        var response, review;
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
	        if (location.reviews && location.reviews.length > 0){
	        	review = location.reviews.id(req.params.reviewid);
	        	console.log(req.params.reviewid);
	        	console.log("length:" + location.reviews.length);
	        	console.log("reviews:" + location.reviews);
	        	console.log('reviews is :' + review);
	        	if (!review){
	        		sendJsonResponse(res, 404, {
	        			"message": "reviewid not found"
	        		});
	        	} else {
	        		response = {
	        			location: {
	        				name : location.name,
	        				id : req.params.locationid
	        			},
	        			review : review
	        		};
	        		sendJsonResponse(res, 200, response);
	        	   }
	        	} 
        	else {
        		sendJsonResponse(res, 404, {
        			"message": "No reviews found"
        		});
        	}
        }
     );	
   } 
    else {
      console.log('No locationid and reviewid specified');
      sendJsonResponse(res, 404, {
        "message": "Sorry, locationidand reviewid are both required"
      });
    }
  };

// put
module.exports.reviewsUpdateOne = function(req, res){
	if (!req.params.locationid || !req.params.reviewid) {
		sendJsonResponse(res, 404, {
			"message": "Sorry, locationid and reviewid are both required!!!"
		});
		return;
	}
	Location
		.findById(req.params.locationid)
		.select('reviewid')
		.exec(
			function(err, location){
				var thisReview;
				if (!location) {
					sendJsonResponse(res, 404, {
						"message": "locationid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				if (location.reviews && location.reviews.length > 0) {
					thisReview = location.reviews.id(req.params.reviewid);
					if (!thisReview) {
						sendJsonResponse(res, 404, {
							"message": "reviewid not found"
						});
					} else {
						thisReview.author = req.body.author;
						thisReview.rating = req.body.rating;
						thisReview.reviewText = req.body.reviewText;
						location.save(function(err, location){
							if (err) {
								sendJsonResponse(res, 404, err);
							} else {
								updateAverageRating(location._id);
								sendJsonResponse(res, 200, thisReview);
							}
						});
					}
				} else {
					sendJsonResponse(res, 404, {
						"message": "No review to update"
					});
				}
			}
		);
};

// delete
module.exports.reviewsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};