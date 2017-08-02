var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

var isAdmin = function (req, res, next) {
	if (req.isAuthenticated() && req.user.isAdmin === true)
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { 
			message: req.flash('message'),
			pageHeader: {
			title: 'Sign In'
			}
		});
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		failureRedirect: '/users/login/',
		failureFlash : true  
	}), function(req, res){
		if (req.user.isAdmin === true){
			res.redirect('/users/admin');
		} else {
			res.redirect('/users/');
		}
	});

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{
			message: req.flash('message'),
			pageHeader: {
			title: 'Sign Up'
			}
		});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/users/login/',
		failureRedirect: '/users/signup/',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		console.log("username:"+req.user.username);
		res.render('index', { 
			user: req.user.username,
			userid: req.user._id, 
			title: 'Find what you like!'});
	});

	/* Handle Logout */
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/users/');
	});

	/* Admin Page */
	router.get('/admin', isAdmin, function(req, res){
		res.render('admin', {
			title: "Hello Administrator!",
			user: req.user.username,
			userid: req.user._id,
			isAdmin: req.user.isAdmin
		});
	});

	return router;
}

