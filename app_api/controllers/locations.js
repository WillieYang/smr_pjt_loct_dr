var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var ObjectId = require('mongodb').ObjectID;

// function to return JSON data and status code.
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// create
module.exports.locationsCreate = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// get 
module.exports.locationsListByDistance = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
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

	 //        Location.find({
		//     '_id': { $in: [
		//         mongoose.Types.ObjectId('5937c4c18f3da38b9429bba8'),
		//         mongoose.Types.ObjectId('5937c1ce8f3da38b9429bba5'), 
		//         mongoose.Types.ObjectId('5937bcdb8f3da38b9429bba1')
		//     ]}
		// }, function(err, docs){
		//      console.log(docs);
		// });



	          // console.log(Location.find());
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
	    sendJSONresponse(res, 404, {
	      "message": "No locationid in request"
	    });
	  }
	};

// 	Location
// 		.findById(ObjectId(req.params.locationid))
// 		.exec(function(err, location){
// 			sendJsonResponse(res, 200, location);
// 			console.log(location);
// 		});
// 		console.log(ObjectId(req.params.locationid));
// 		console.log(typeof(ObjectId(req.params.locationid)));
// };

// put
module.exports.locationsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// delete
module.exports.locationsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};