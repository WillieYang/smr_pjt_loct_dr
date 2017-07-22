// Require the Mongoose
var mongoose = require('mongoose');

// Schema for user
var UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
});

// Compiling the Schema into Model
// First parameter is the name of model, 
// and the second parameter is the name of schema.
mongoose.model('User', UserSchema);