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

// ignore(delete) a specific report (fake report)
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
			res.redirect('/users/admin/reports');
		}
	});
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
				if (response.statusCode === 204) {
					console.log("Delete the reported review");
					res.redirect('/users/admin/reports');
				}
			});
		}
	});
};

// form to contact the whistlebower or review author
var renderContactForm = function(req, res){
	var whistlebower_name = req.query.whistlebower_name;
	var whistlebower_email = req.query.whistlebower_email;
	var reviewAuthor_name = req.query.reviewAuthor_name;
	var reviewAuthor_email = req.query.reviewAuthor_email;
	var passData;
	//console.log("whistlebower_name:" + whistlebower_name);

	if (whistlebower_name && whistlebower_email){
		passData = {
			title: "Contact",
			contact_name: whistlebower_name,
			contact_email: whistlebower_email,
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

module.exports.reportContactForm = function(req, res){
	renderContactForm(req, res);
};

// send message to corresponding people
module.exports.reportContact_post = function(req, res){
	var contact_name = req.body.contact_name;
	var contact_email = req.body.contact_email;
	var send_content = req.body.send_content;
	console.log("Whether this controller is operated?");
	console.log("contact_name: " + contact_name);
	console.log("contact_email: " + contact_email);
	console.log("send_content: " + send_content);

	var mailOptions = {
		from: 'shengyangsn@yahoo.com',
		to: contact_email,
		subject: 'Official Message from Locaiton Seeking',
		text: send_content
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error){
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
	res.redirect('/users/admin/reports');
};