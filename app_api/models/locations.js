// Require the Mongoose
var mongoose = require('mongoose');

// Schema for Opening Time (Nested Schema of locationSchema)
var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

// Schema for Reviews (Nested Schema of locationSchma)
var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	reviewText: String,
	createdOn: {type: Date, "default": Date.now} 
});

// Schema for location
var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords: {type: [Number], index: '2dsphere', required: true},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

// Compiling the Schema into Model
// First parameter is the name of model, 
// and the second parameter is the name of schema.
mongoose.model('Location', locationSchema);
