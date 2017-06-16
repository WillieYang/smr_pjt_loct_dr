var mongoose = require('mongoose');
var Location = mongoose.model('Location');

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
	sendJsonResponse(res, 200, {"status": "success"});
};

// put
module.exports.locationsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// delete
module.exports.locationsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};