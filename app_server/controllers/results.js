// import the request module into this file
var request = require('request');

var renderSearchResults = function(req, res, responseBody){
	console.log("responseBody:" + responseBody);
	console.log("responseBody length:" + responseBody.length);
	for (var i =0; i < responseBody.length; i++){
		console.log("name in responseBody:" + responseBody[i].title);
	}

	if (!(responseBody instanceof Array)) {
		errorMessage = "API fetching error";
		responseBody = [];
	}

	res.render('search_results', {
		user: req.user.username,
		title: "Search Results",
		pageHeader: {
			title: 'Find places to work near you!'
		},
		items: responseBody,
	});
};

/* Get 'Search Results' page. */
// This would make use of Google custome search
module.exports.searchResults = function(req, res){
	var requestOptions, url, searchAPI;

	var APIKey = 'AIzaSyD-gjo3VFiW6AXpPtZ7zLoY-VaoGUZgAuQ';
	var cx = '004898931646717710217:u1yfik5cc5a';
	var query = req.body.query;
	console.log("query:" + query);
	searchAPI = 'https://www.googleapis.com/customsearch/v1';
	url = searchAPI + '?key=' + APIKey + '&cx=' + cx + '&q=' + query;
	// url = 'http://www.google.co.uk/';
	console.log("url:" + url);
	requestOptions = {
		url: url,
		method: "GET",
	};
	request(requestOptions, function(err, response, body){
		if (err) {
			console.log("err message:"+err);
		} else {
			var results = [];
			console.log("body before item:" + body);
			var body = JSON.parse(body);
			var items = body.items;
			console.log("items:" + items);
			console.log("No err existed");
			console.log("searched data:" + body);
			for (var i = 0; i < items.length; i++){
				console.log("title:" + items[i].title);
				console.log("link:" + items[i].link);
				results.push({
					title: items[i].title,
					link: items[i].link});
			}
			console.log("search_results:" + JSON.stringify(results));


			renderSearchResults(req, res, results);
		}
	});
};