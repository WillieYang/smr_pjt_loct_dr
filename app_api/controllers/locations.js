// function to return JSON data and status code.
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// create
module.exports.locationCreate = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// get 
module.exports.locationListByDistance = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// get
module.exports.locationReadOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// put
module.exports.locationUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// delete
module.exports.locationDelete = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};