var express = require('express');
var router = express.Router();

var ctrlLocation = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
var ctrlResults = require('../controllers/results');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/users/login/');
}

module.exports = function(passport){

/* Location page. */
router.post('/locationlist', isAuthenticated, ctrlLocation.locationList);

router.get('/location/:locationid', isAuthenticated, ctrlLocation.locationInfo);

router.get('/location/:locationid/reviews/new', isAuthenticated, ctrlLocation.addReview);

router.post('/location/:locationid/reviews/new', isAuthenticated, ctrlLocation.addReview_post);

/* Others page. */
router.get('/', ctrlOthers.homepage);

router.get('/about', isAuthenticated, ctrlOthers.about);

/* Google search results page. */
router.post('/results', isAuthenticated, ctrlResults.searchResults);

/* User's loved location page */

router.post('/users/:userid/lovedLocations', isAuthenticated, ctrlLocation.lovedLocation_post);

router.get('/users/:userid/lovedLocations', isAuthenticated, ctrlLocation.lovedLocation_get);

router.post('/users/:userid/lovedLocations/:lovedlocationid', isAuthenticated, ctrlLocation.lovedLocation_delete);

router.get('/users/:userid/lovedLocations/route', isAuthenticated, ctrlLocation.lovedLocation_route);

return router;

}


