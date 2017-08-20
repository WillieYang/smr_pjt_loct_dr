// Require the Mongoose
var mongoose = require('mongoose');

// Create the URI of database and set it based on environment.
var dbURI = 'mongodb://location:location3302@localhost/smr_pjt_loct';
// var dbURIlog = 'mongodb://localhost/smr_pjt_loctog';

if (process.env.NODE_ENV === 'production') {
	console.log("test:" + process.env.MONGODB_URI);
	dbURI = process.env.MONGODB_URI;
	console.log('test the dbURI:' + dbURI);
}


// Connect the database using Mongoose

// var logDB = mongoose.createConnection(dbURIlog);

mongoose.connect(dbURI, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + dbURI + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + dbURI);
  }
});

// Monitoring the connection with Mongoose connection events(Default Database)
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

// Create a function to shutdown the connection.
var gracefulShutdown = function(msg, callback){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

// Different situation when the connection is terminated.
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function () {
	gracefulShutdown('app termination', function () {
		process.exit(0);
	});
});

process.on('SIGTERM', function () {
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);
	});
});
// Require the locations.js model (location schema)
require('./locations');
require('./users');
require('./reports');