// Require the Mongoose
var mongoose = require('mongoose');

// Schema for reports to admin
var reportSchema = new mongoose.Schema({
	whistlebower_name: String,
	whistlebower_email: String,
	reviewAuthor_name: String,
	reviewAuthor_email: String,
	review_content: String,
	report_content: String,
	place_id: String,
	review_id: String,
	createdOn: {type: Date, "default": Date.now}
});

mongoose.model('Report', reportSchema);