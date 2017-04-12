var express = require('express');
var router = express.Router();
var ctrlLocation = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
/* Location page. */
router.get('/locationlist', ctrlLocation.locationList);
router.get('/location', ctrlLocation.locationInfo);
router.get('/location/review/new', ctrlLocation.addReview);
/* Others page. */
router.get('/', ctrlOthers.homepage);
router.get('/about', ctrlOthers.about);

module.exports = router;
