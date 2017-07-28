// Require the Mongoose
var mongoose = require('mongoose');

// Schema for user's loved location
var userLocationSchema = new mongoose.Schema({
	locationName: {type: String, required: true},
	locationAddress: String,
	coords: {type: [Number], index: '2dsphere', required: true},
	place_id: String,
	createdOn: {type: Date, "default": Date.now}
});

// Schema for user
var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	userLocation: [userLocationSchema]
});

// Compiling the Schema into Model
// First parameter is the name of model, 
// and the second parameter is the name of schema.
mongoose.model('User', userSchema);