var express = require('express');
var router = express.Router();

var ctrlLocation = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
var ctrlResults = require('../controllers/results');
var ctrlReports = require('../controllers/reports');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/users/login/');
}

var isAdmin = function (req, res, next) {
	if (req.isAuthenticated() && req.user.isAdmin === true)
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

/* Location page. */
router.post('/locationlist', isAuthenticated, ctrlLocation.locationList);

router.get('/locationlist', isAuthenticated, ctrlLocation.locationList);

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

/* User's report page */

router.get('/location/:locationid/reviews/:reviewid/report', isAuthenticated, ctrlReports.addReport);

router.post('/location/:locationid/reviews/:reviewid/report', isAuthenticated, ctrlReports.addReport_post);

/* Admin Report Page */

router.get('/users/admin/reports', isAdmin, ctrlReports.adminReports);

router.post('/users/admin/reports/:reportid', isAdmin, ctrlReports.reportIgnore);

router.post('/users/admin/reports/:reportid/reviewRemove', isAdmin, ctrlReports.reviewRemove);

router.get('/users/admin/contact', isAdmin, ctrlReports.reportContact_get);

router.post('/users/admin/contact', isAdmin, ctrlReports.reportContact_post);

/* Successful Page */

router.get('/location/:locationid/report/success', isAuthenticated, ctrlReports.reportSuccess);

router.get('/users/admin/contact/success', isAdmin, ctrlReports.contactSuccess);

return router;

}


