/* Get 'home' page. */
module.exports.homelist = function(req, res){
	res.render('index', {title: 'Home'})
};

/* Get 'location infomation' page. */
module.exports.locationInfo = function(req, res){
	res.render('index', {title: 'location Infomation'})
};

/* Get 'Add Review' page. */
module.exports.addReview = function(req, res){
	res.render('index', {title: 'Add Review'})
};