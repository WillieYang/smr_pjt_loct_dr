// import the request module into this file
var request = require('request');


// set the different options both in local and living environment.
var apiChoosing = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiChoosing.server = "https://smr-pjt-loct-dr.herokuapp.com";
} 

/* Get 'Report add' page. */
var renderReportForm = function(req, res){
	res.render('review_report_form', {
		title: "Report",
		user: req.user.username,
		userid: req.user._id,
		useremail: req.user.email,
		isAdmin: req.user.isAdmin,
		reviewAuthor_name: req.query.reviewAuthor_name,
		reviewAuthor_email: req.query.reviewAuthor_email,
		review_content: req.query.review_content
	});
};

module.exports.addReport = function(req, res){
	renderReportForm(req, res);
};

/* Post 'Report add' page. */

module.exports.addReport_post = function(req, res){
	var reviewAuthor_name = req.body.reviewAuthor_name;
	var reviewAuthor_email = req.body.reviewAuthor_email;
	var whistlebower_name = req.body.whistlebower_name;
	var whistlebower_email = req.body.whistlebower_email;
	var review_content = req.body.review_content;
	var report_content = req.body.report_content;
	var place_id = req.params.locationid;
	var review_id = req.params.reviewid;

	var requestOptions_post, path_post, userid, postdata;

	path_post = '/api/admin/reports';

	postdata = {
		reviewAuthor_name: reviewAuthor_name,
		reviewAuthor_email: reviewAuthor_email,
		whistlebower_name: whistlebower_name,
		whistlebower_email: whistlebower_email,
		review_content: review_content,
		report_content: report_content,
		place_id: place_id,
		review_id: review_id
	};

	requestOptions_post = {
		url: apiChoosing.server + path_post,
		method: "POST",
		json: postdata
	};

	request(requestOptions_post, function(err, response, body){
		if (response.statusCode === 201){
			res.redirect('/location/' + place_id);
		} else {
			showError(req, res, response.statusCode);
		}
	});
};