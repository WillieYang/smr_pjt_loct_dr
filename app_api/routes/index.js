var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

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
// router.post('/users/:userid/lovedLocations', ctrlLocations.lovedLocationCreate);
// router.get('/users/:userid/lovedLocations/:lovedlocationid', ctrlLocations.lovedLocationCreate);
// router.delete('/users/:userid/lovedLocations/:lovedlocationid', ctrlLocations.lovedLocationDelete);
// router.put('/users/:userid/lovedLocations/:lovedlocationid', ctrlLocations.lovedLocationUpdate);

// export routes
module.exports = router;