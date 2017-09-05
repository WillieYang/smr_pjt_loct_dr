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
	console.log("review API--place_id:" + locationid);
	if (locationid) {
		Location
		  .findOne({'place_id': req.params.locationid})
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
	      author_id: req.body.author_id,
	      author_email: req.body.author_email,
	      rating: req.body.rating,
	      reviewText: req.body.reviewText
	  });
	  location.save(function(err, location) {
	      // var thisReview;
	      if (err) {
	        sendJsonResponse(res, 400, err);
	      } else {
	      	console.log("location.place_id: " + location.place_id);
	        sendJsonResponse(res, 201, location);
	      }
	   });
    }
};

// get
module.exports.reviewsReadOne = function(req, res){
	if (req.params && req.params.locationid && req.params.reviewid) {
	    Location
	      .findOne({'place_id': req.params.locationid})
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
        "message": "Sorry, locationid and reviewid are both required"
      });
    }
  };

// delete
module.exports.reviewsDeleteOne = function(req, res){
	if (!req.params.locationid || !req.params.reviewid) {
		sendJsonResponse(res, 404, {
			"message": "Sorry, locationid and reviewid are both required"
		});
		return;
	}
	Location
		.findOne({'place_id': req.params.locationid})
		.select('reviews')
		.exec(
			function(err, location){
				console.log("location:" + location);
				//console.log("locationreviews:" + location.reviews);
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
					if (!location.reviews.id(req.params.reviewid)) {
						sendJsonResponse(res, 404, {
							"message": "reviewid not found"
						});
					} else {
						location.reviews.id(req.params.reviewid).remove();
						location.save(function(err) {
							if (err) {
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 204, null);
							}
						});
					}
				} else {

					sendJsonResponse(res, 404, {
						"message": "No review to remove"
					});
				}
			}
		);
};