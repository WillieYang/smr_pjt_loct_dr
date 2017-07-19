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
var renderLocationList = function(req, res, responseBody){
	var errorMessage;
	// console.log("responseBody:"+ responseBody.results);
	// console.log("length:" + responseBody.results.length);
	// var results = [];
	// for (var i in responseBody.results){
	// 	results.push(responseBody.results[i]);
	// }
	// console.log("results:"+results);
	// var responseBody = [];

	if (!(responseBody instanceof Array)) {
		errorMessage = "API fetching error";
		responseBody = [];
	} else {
		if (!responseBody.length) {
			errorMessage = "No places found nearby"
		}
	}
	res.render('locations_list', {
		title: 'Find places to work near you!',
		pageHeader: {
			title: 'Find places to work near you!'
		},
		locations: responseBody,
		errorMessage: errorMessage
	});
};
// module.exports.locationListPost = function(res,req){
// 	console.log("locationListPost data reveal");
// 	res.render('locations_list');
// };

// function to format the distance
var DistanceFormat = function(distance){
	var dis;
	if (distance < 1){
		var dis = distance * 1000;
		dis = dis.toFixed(0);
		return dis + "m";
	} else {
		var dis = distance.toFixed(2);
		return dis + "km";
	}
};

// function to calculate distance 
var deg2rad = function(deg){
	return deg * (Math.PI/180)
};

var getDistance = function(lat1, lng1, lat2, lng2){
	var R = 6371; // Radius of the earth in km
  	var dLat = deg2rad(lat2-lat1);  // deg2rad below
  	var dLon = deg2rad(lng2-lng1); 
  	var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
};


// Get: Location List
module.exports.locationList = function(req, res){
	console.log("Passed Latitude:" + req.body.Latitude);
	console.log("Passed Longitude:" + req.body.Longitude);
	var lng = req.body.Longitude;
	var lat = req.body.Latitude;
	var requestOptions, path, placeAPI, APIKey, url;

	APIKey = 'AIzaSyCh44nqumpJ45eYdA5q7PuWkXFt6sF82KY';
	placeAPI = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'; 
	url = placeAPI + 'location=' + lat +', ' + lng + '&radius=500' + '&type=restaurant' + '&key=' + APIKey;

	requestOptions = {
		url: url,
		method: "GET",
	};

	request(requestOptions, function(err, response, body){
		if (err) {
			console.log("err message:"+err);
		} else {
			console.log("body:" + body);
			var results = [];
			var body = JSON.parse(body);
			var location = body.results;
			console.log("location" + location);
			for (var i =0; i< location.length; i++){
				console.log("Name:"+location[i].name);
				console.log("Rating:"+location[i].rating);
				console.log('lat:' + location[i].geometry.location.lat);
				console.log('lng:' + location[i].geometry.location.lng);
				console.log('address:' + location[i].vicinity);
				console.log('facilities:' + location[i].types);
				console.log('place_id:' + location[i].place_id);
				// if (typeof (location[i].opening_hours.open_now) === 'undefined'){
				// 	var open_or_not = [];
				// } else {
				// 	var open_or_not = location[i].opening_hours.open_now;
				// }
				try{
					var open_or_not = location[i].opening_hours.open_now;	
				}catch(e){
					var open_or_not = [];
				}
				console.log('open_now:' + open_or_not);
				var lat1 = lat;
				var lng1 = lng;
				console.log("get the current location:" + lat1);
				var lat2 = location[i].geometry.location.lat;
				var lng2 = location[i].geometry.location.lng;
				var dis = getDistance(lat1, lng1, lat2, lng2);
				dis = DistanceFormat(dis);

				results.push({name: location[i].name,
							  rating: location[i].rating,
							  lat: location[i].geometry.location.lat,
							  lng: location[i].geometry.location.lng,
							  distance: dis,
							  address: location[i].vicinity,
							  facilities: location[i].types,
							  openingTimes: open_or_not,
							  place_id: location[i].place_id});
				console.log("get data from location:"+ results.name);
			}
			for (var i = 0; i< results.length; i++){
				console.log("get data from location:"+ results.name);	
			}
			console.log("results_name:" + JSON.stringify(results));
			console.log("No err existed");
			console.log("location data:" + body);
			console.log("Distance between two place:" + getDistance(50.9383210, -1.3912900, 50.9438105, -1.4036067));
			renderLocationList(req, res, results);
		}
	});

	// path = '/api/locations';
	// requestOptions = {
	// 	url: apiChoosing.server + path,
	// 	method: "GET",
	// 	json: {},
	// 	qs: {
	// 		lng: lng,
	// 		lat: lat,
	// 		maxDistance: 300
	// 	}
	// };
	// request(requestOptions, function(err, response, body){
	// 	console.log("responseBody" + body);
	// 	var i, data;
	// 	data = body;
	// 	if (response.statusCode === 200 && data.length) {
	// 		for (i = 0; i < data.length; i++){
	// 		data[i].distance = DistanceFormat(data[i].distance);
	// 		}
	// 	}
	// 	if (data === body) {
	// 		console.log("These two vars are equal.");
	// 	} else {
	// 		console.log("These two vars are not equal.");
	// 	}
	// 	renderLocationList(req, res, data);
	// });
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
	
	// var location = req.query.location;
	// console.log("Check the type of location:" + (typeof location));
	// console.log("get the query location:"+ location.length);
	// console.log("location type: " + JSON.stringify(location));
	var name = req.query.name;
	var rating = req.query.rating;
	var address = req.query.address;
	var facilities = req.query.facilities;
	var openingTimes = req.query.openingTimes;
	var lat = req.query.lat;
	var lng = req.query.lng;
	var place_id = req.params.locationid;

	console.log("openingTimes:" + req.query.openingTimes);
	console.log("name:" + req.query.name);
	console.log("rating:" + req.query.rating);
	console.log("facilities:" + req.query.facilities);
	console.log("address:" + req.query.address);
	console.log("lat:" + req.query.lat);
	console.log("lng:" + req.query.lng);

	var passData = {
		name: name,
		rating: rating,
		address: address,
		facilities: facilities,
		openingTimes: openingTimes,
		lat: lat,
		lng: lng,
		place_id: place_id
	};

	var requestOptions_get, path, requestOptions_post;
	path_get = '/api/locations/' + req.params.locationid;
	path_post = '/api/locations/';
	console.log("location id:" + req.params.locationid);

	requestOptions_get = {
		url: apiChoosing.server + path_get,
		method: "GET",
		json: {},
	};
	requestOptions_post = {
		url: apiChoosing.server + path_post,
		method: "POST",
		json: passData
	};
	request(requestOptions_get, function(err, response, body){
		var data = body;
		if (response.statusCode === 200) {
			console.log("lng:" + body.coords[0]);
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			};
			callback(req, res, data);	
		} else {
			// showError(req, res, response.statusCode);
			request(requestOptions_post, function(err_post, response_post, body_post){
				console.log("This step all right or not?");
				if (response_post.statusCode === 201) {
					console.log("This step all right or not v2?");
					callback(req, res, body_post);
				}
			});




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