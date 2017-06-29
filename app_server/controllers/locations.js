// import the request module into this file
var request = require('request');

// set the different options both in local and living environment.
var apiChoosing = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiChoosing.server = "https://smr-pjt-loct-dr.herokuapp.com";
} 

/* Get 'Location List' page. */
// render function of get the location list
var renderLocationList = function(req, res){
	res.render('locations_list', {
		title: 'Find places to work near you!',
		pageHeader: {
			title: 'Find places to work near you!'
		}
	});
};
// Get: Location List
module.exports.locationList = function(req, res){
	renderLocationList(req, res, data);
};
// function to format the distance
var DistanceFormat = function(distance){
	var formatDistance = distance.toFixed(0);
	return formatDistance + "m";
};

/* Get 'location infomation' page. */
// render function to get the detailed page
var renderDetailPage = function(req, res, locationInfo){
		console.log("name:" + locationInfo.name);
		res.render('location_info', {
		title: locationInfo.name,
		pageHeader: {
			title: locationInfo.name
		},
		sidebar: {
			context: 'provide accessible wifi and space to help you sit down with laptop and get work done.',
			callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
		},
		location: locationInfo
	})	
};

// status error message function
var showError = function(req,res, statusCode){
	var title, content;
	if (statusCode === 404) {
		title = "404 Not Found";
		content = "Sorry, the page is not existed. Please try again!!!";
	} else {
		title = statusCode + ", someting goes wrong, please try again!!!";
	}
	res.status(statusCode);
	res.render('error', {
		title: title,
		content: content
	});
};

// function to get location information
var getLocationInfo = function(req, res, callback){
	var requestOptions, path;
	path = '/api/locations/' + req.params.locationid;
	console.log("locaiton id:" + req.params.locationid);
	console.log("path:" + path);
	requestOptions = {
		url: apiChoosing.server + path,
		method: "GET",
		json: {},
	};
	request(requestOptions, function(err, response, body){
		var data = body;
		if (response.statusCode === 200) {
			console.log("lng:" + body.coords[0]);
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			};
			callback(req, res, data);	
		} else {
			showError(req, res, response.statusCode);
		}
		
	});	
};

module.exports.locationInfo = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderDetailPage(req, res, responseData);
	});
};

// render the addReview page
var renderReviewForm = function(req, res, locationInfo){
	res.render('location_review_form', {
		title: locationInfo.name,
		pageHeader: {title: locationInfo.name},
		location: locationInfo,
		error: req.query.err
	});
};

/* Get 'Add Review' page. */
module.exports.addReview = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderReviewForm(req, res, responseData);
	});
};

/* Post 'Add Review' page. */
module.exports.addReview_post = function(req, res){
	var requestOptions, path, locationid, postdata;
	locationid = req.params.locationid;
	console.log("location id of addReview: " + locationid);
	path = '/api/locations/' + locationid + '/reviews/';
	postdata = {
		author: req.body.name,
		rating: parseInt(req.body.rating, 10),
		reviewText: req.body.review
	};
	if (!postdata.author || !postdata.rating || !postdata.reviewText) {
		res.redirect('/location/' + locationid + '/reviews/new?err=val');
	} else {
		requestOptions = {
		url: apiChoosing.server + path,
		method: "POST",
		json: postdata
	};
	  request(requestOptions, function(err, response, body){
		if (response.statusCode === 201) {
			res.redirect('/location/' + locationid);
	  } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
			res.redirect('/location/' + locationid + '/reviews/new?err=val');
	  } else {
		showError(req, res, response.statusCode);
			}
		});
	}
};