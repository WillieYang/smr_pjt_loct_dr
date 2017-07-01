// import the request module into this file
var request = require('request');

var renderSearchResults = function(req, res, data){
	res.render('search_results', {
		title: "Google search results"
	});
};

/* Get 'Search Results' page. */
module.exports.searchResults = function(req, res){
	var requestOptions, url, searchAPI;

	var APIKey = 'AIzaSyD-gjo3VFiW6AXpPtZ7zLoY-VaoGUZgAuQ';
	var cx = '004898931646717710217:u1yfik5cc5a';
	var query = req.body.search;
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
			var data = body;
			console.log("No err existed");
			console.log("searched data:" + data);
			renderSearchResults(req, res, data);
		}
	});
};