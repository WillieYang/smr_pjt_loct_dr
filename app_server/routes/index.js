var express = require('express');
var router = express.Router();
var ctrlLocation = require('../controllers/location');
var ctrlOthers = require('../controllers/others');
/* GET Location page. */
router.get('/', ctrlLocation.homelist);
router.get('/location', ctrlLocation.locationinfo);
router.get('/location/review/new', ctrlLocation.addReview);
/* GET Others page. */
router.get('/about', ctrlOthers.about);

module.exports = router;
