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