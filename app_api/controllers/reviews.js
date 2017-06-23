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
			"message": "Not found, locationid required!!!"
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
        "message": "Not found, locationidand reviewid are both required"
      });
    }
  };

// put
module.exports.reviewsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// delete
module.exports.reviewsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};