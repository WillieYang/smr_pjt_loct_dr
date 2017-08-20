var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlUserLocation = require('../controllers/userLocation');
var ctrlReports = require('../controllers/reports');

// locations
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

/* reviews */
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

/* user's loved location */
// create a loved locaiton for a specific user.
router.post('/users/:userid/lovedLocations', ctrlUserLocation.lovedLocationCreate);

// get a specific loved locaiton from a user
router.get('/users/:userid/lovedLocations/:lovedLocationName', ctrlUserLocation.lovedLocationGet);

// get a list of loved location for a specific user
router.get('/users/:userid/lovedLocations', ctrlUserLocation.lovedLocationListGet);

router.delete('/users/:userid/lovedLocations/:lovedlocationid', ctrlUserLocation.lovedLocationDelete);

/* report to the admin */
// create reports from users
router.post('/admin/reports', ctrlReports.reportsCreate);

// delete the reports form users

router.delete('/admin/reports/:reportid', ctrlReports.reportsDelete);

// get reports in admin page.

router.get('/admin/reports', ctrlReports.reportsGet);

// export routes
module.exports = router;