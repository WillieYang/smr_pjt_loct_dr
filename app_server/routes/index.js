var express = require('express');
var router = express.Router();
var ctrlLocation = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
var ctrlResults = require('../controllers/results');
/* Location page. */
router.post('/locationlist', ctrlLocation.locationList);
// router.post('/locationlistPost', ctrlLocation.locationListPost);
router.get('/location/:locationid', ctrlLocation.locationInfo);
router.get('/location/:locationid/reviews/new', ctrlLocation.addReview);
router.post('/location/:locationid/reviews/new', ctrlLocation.addReview_post);
/* Others page. */
router.get('/', ctrlOthers.homepage);
router.get('/about', ctrlOthers.about);
/* Google search results page. */
router.post('/results', ctrlResults.searchResults);

module.exports = router;
