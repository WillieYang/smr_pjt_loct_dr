var mongoose = require('mongoose');
var Report = mongoose.model('Report');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// create reports
module.exports.reportsCreate = function(req, res){
	
	Report.create({
		whistlebower_name: req.body.whistlebower_name,
		whistlebower_email: req.body.whistlebower_email,
		reviewAuthor_name: req.body.reviewAuthor_name,
		reviewAuthor_email: req.body.reviewAuthor_email,
		review_content: req.body.review_content,
		report_content: req.body.report_content,
		place_id: req.body.place_id,
		review_id: req.body.review_id
	}, function(err, report){
		if (err) {
			sendJsonResponse(res, 404, err);
		}else {
			sendJsonResponse(res, 201, report);
		}
	});
};

// delete reports
module.exports.reportsDelete = function(req, res){
	var reportid = req.params.reportid;
	if (reportid) {
		Report
			.findByIdAndRemove(reportid)
			.exec(function(err, report){
				if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 204, null);
			}
		);
	} else {
		sendJsonResponse(res, 404, {
			"message": "No reportid"
		});
	}
};