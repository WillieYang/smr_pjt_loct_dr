// import the request module into this file
var request = require('request');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'shengyangsn@yahoo.com',
        pass: '13890427898ys'
    }
});	

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
		location_name: req.query.location_name,
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
	var location_name = req.body.location_name;
	var reviewAuthor_name = req.body.reviewAuthor_name;
	var reviewAuthor_email = req.body.reviewAuthor_email;
	var whistleblower_name = req.body.whistleblower_name;
	var whistleblower_email = req.body.whistleblower_email;
	var review_content = req.body.review_content;
	var report_content = req.body.report_content;
	var place_id = req.params.locationid;
	var review_id = req.params.reviewid;

	var requestOptions_post, path_post, userid, postdata;

	path_post = '/api/admin/reports';

	postdata = {
		location_name: location_name,
		reviewAuthor_name: reviewAuthor_name,
		reviewAuthor_email: reviewAuthor_email,
		whistleblower_name: whistleblower_name,
		whistleblower_email: whistleblower_email,
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
			res.redirect('/location/' + place_id + '/report/success');
		} else {
			showError(req, res, response.statusCode);
		}
	});
};

/* Get 'Report successful' page. */
var renderReportSuccess = function(req, res){
	var locationid = req.params.locationid;
	console.log("Place_id:" + locationid);
	res.render('review_report_success', {
		title: "Report",
		user: req.user.username,
		userid: req.user._id,
		useremail: req.user.email,
		isAdmin: req.user.isAdmin,
		place_id: locationid
	});
};

module.exports.reportSuccess = function(req, res){
	renderReportSuccess(req, res);
};


// Admin reports view page
var renderAdminReports = function(req, res, response){
	res.render('adminReports', {
		title: "Admin Reports",
		user: req.user.username,
		userid: req.user._id,
		useremail: req.user.email,
		isAdmin: req.user.isAdmin,
		reports: response
	});
};

module.exports.adminReports = function(req, res){
	var requestOptions, path;
	path = '/api/admin/reports';

	requestOptions = {
		url: apiChoosing.server + path,
		method: "GET",
		json: {},
	};

	request(requestOptions, function(err, response, body){
		if (response.statusCode === 200){
			renderAdminReports(req, res, body);
		}
	});
};

// Post: ignore(delete) a specific report (fake report)
module.exports.reportIgnore = function(req, res){
	var requestOptions, path;
	var reportid = req.params.reportid;
	path = '/api/admin/reports/' + reportid;

	requestOptions = {
		url: apiChoosing.server + path,
		method: "DELETE",
		json: {},
	};

	request(requestOptions, function(err, response, body){
		if (response.statusCode === 204) {
			res.redirect('/users/admin/reports/ignoreSuccess');
		}
	});
};

/* Get 'Ignore successful' page. */
var renderIgnoreSuccess = function(req, res){
	res.render('report_ignore_success', {
		title: "Admin Reports",
		user: req.user.username,
		userid: req.user._id,
		useremail: req.user.email,
		isAdmin: req.user.isAdmin
	});
};

module.exports.ignoreSuccess = function(req, res){
	renderIgnoreSuccess(req, res);
};

// remove a specific review (reported one) and report
module.exports.reviewRemove = function(req, res){
	var requestOptions, path;
	var reportid = req.params.reportid;

	var requestOptions_review, path_review;
	var place_id = req.query.place_id;
	var review_id = req.query.review_id;
	
	path = '/api/admin/reports/' + reportid;
	path_review = '/api/locations/' + place_id + '/reviews/' + review_id;

	requestOptions = {
		url: apiChoosing.server + path,
		method: "DELETE",
		json: {},
	};

	requestOptions_review = {
		url: apiChoosing.server + path_review,
		method: "DELETE",
		json: {},
	};

	request(requestOptions, function(err, response, body){
		if (response.statusCode === 204) {
			console.log("Delete the current report");

			request(requestOptions_review, function(err_review, response_review, body_review){
				if (response_review.statusCode === 204) {
					console.log("Delete the reported review");
					res.redirect('/users/admin/reports/reviewRemoveSuccess');
				} else if (response_review.statusCode === 404) {
					res.redirect('/users/admin/reports/reviewRemoveFailed');
				}
			});
		}
	});
};

/* Get 'Review Remove failed' page. */
var renderReviewRemoveFailed = function(req, res){
	res.render('review_remove_failed', {
		title: "Admin Reports",
		user: req.user.username,
		userid: req.user._id,
		useremail: req.user.email,
		isAdmin: req.user.isAdmin
	});
};

module.exports.reviewRemoveFailed = function(req, res){
	renderReviewRemoveFailed(req, res);
};

/* Get 'Review Remove successful' page. */
var renderReviewRemoveSuccess = function(req, res){
	res.render('review_remove_success', {
		title: "Admin Reports",
		user: req.user.username,
		userid: req.user._id,
		useremail: req.user.email,
		isAdmin: req.user.isAdmin
	});
};

module.exports.reviewRemoveSuccess = function(req, res){
	renderReviewRemoveSuccess(req, res);
};

// form to contact the whistleblower or review author
var renderContactForm = function(req, res){
	var whistleblower_name = req.query.whistleblower_name;
	var whistleblower_email = req.query.whistleblower_email;
	var reviewAuthor_name = req.query.reviewAuthor_name;
	var reviewAuthor_email = req.query.reviewAuthor_email;
	var passData;
	//console.log("whistleblower_name:" + whistleblower_name);

	if (whistleblower_name && whistleblower_email){
		passData = {
			title: "Contact",
			contact_name: whistleblower_name,
			contact_email: whistleblower_email,
			user: req.user.username,
			userid: req.user._id,
			useremail: req.user.email,
			isAdmin: req.user.isAdmin	
		};
	}

	if (reviewAuthor_name && reviewAuthor_email){
		passData = {
			title: "Contact",
			contact_name: reviewAuthor_name,
			contact_email: reviewAuthor_email,
			user: req.user.username,
			userid: req.user._id,
			useremail: req.user.email,
			isAdmin: req.user.isAdmin	
		};
	}
	console.log("passData:" + passData);	
	res.render('report_contact_form', passData);
};

module.exports.reportContact_get = function(req, res){
	renderContactForm(req, res);
};

// send message to corresponding people
module.exports.reportContact_post = function(req, res){
	var contact_name = req.body.contact_name;
	var contact_email = req.body.contact_email;
	var send_content = req.body.send_content;
	console.log("Whether this controller is operated?");
	console.log("consoleontact_name: " + contact_name);
	console.log("contact_email: " + contact_email);
	console.log("send_content: " + send_content);

	var text = "Hi " + contact_name + ",\r\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "This is the message from Locaiton Seeking.\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + send_content + "\r\n" + "Thanks for your cooperation!" + "\nLocation Seeking Office";

	var mailOptions = {
		from: 'shengyangsn@yahoo.com',
		to: contact_email,
		subject: 'Official Message from Locaiton Seeking',
		text: text
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error){
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
	res.redirect('/users/admin/contact/success');
};

/* Get 'Contact successful' page. */
var renderContactSuccess = function(req, res){
	res.render('report_contact_success', {
		title: "Contact",
		user: req.user.username,
		userid: req.user._id,
		useremail: req.user.email,
		isAdmin: req.user.isAdmin
	});
};

module.exports.contactSuccess = function(req, res){
	renderContactSuccess(req, res);
};