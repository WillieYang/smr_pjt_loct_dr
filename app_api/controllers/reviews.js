// function to return JSON data and status code.
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// create
module.exports.reviewsCreate = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// get
module.exports.reviewsReadOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// put
module.exports.reviewsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};

// delete
module.exports.reviewsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success"});
};