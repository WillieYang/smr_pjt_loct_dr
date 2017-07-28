var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlUserLocation = require('../controllers/userLocation');

// locations
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

// user's loved location
router.post('/users/:userid/lovedLocations', ctrlUserLocation.lovedLocationCreate);
// router.get('/users/:userid/lovedLocations/:lovedlocationid', ctrlUserLocation.lovedLocationGet);
// router.delete('/users/:userid/lovedLocations/:lovedlocationid', ctrlUserLocation.lovedLocationDelete);
// router.put('/users/:userid/lovedLocations/:lovedlocationid', ctrlUserLocation.lovedLocationUpdate);

// export routes
module.exports = router;