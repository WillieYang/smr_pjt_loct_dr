// Require the Mongoose
var mongoose = require('mongoose');

// Schema for reports to admin
var reportSchema = new mongoose.Schema({
	whistlebower_name: String,
	whistlebower_email: String,
	reviewAuthor_name: String,
	whistlebower_email: String,
	place_id: String,
	review_id: String,
	createdOn: {type: Date, "default": Date.now}
});

mongoose.model('Report', reportSchema);