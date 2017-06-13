// Require the Mongoose
var mongoose = require('mongoose');

// Create the URI of database and set it based on environment.
var dbURI;
if (process.env.NODE_ENV === 'production') {
	console.log("test:" + process.env.MONGODB_URI);
	dbURI = process.env.MONGODB_URI;
	console.log('test the dbURI:' + dbURI);
}
var dbURIlog = 'mongodb://localhost/smr_pjt_loctog';

// Connect the database using Mongoose
var logDB = mongoose.createConnection(dbURIlog);
mongoose.connect(dbURI);

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

// Monitoring the connection with Mongoose connection events(Created database)
logDB.on('connected', function (){
	console.log('Mongoose connected to ' + dbURIlog);
});

logDB.close(function () {
	console.log('Mongoose log disconnected');
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
