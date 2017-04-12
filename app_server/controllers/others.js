/* Get 'home' page. */
module.exports.homepage = function(req, res){
	res.render('index', {title: 'Home Page'})
};

/* Get 'about' page. */
module.exports.about = function(req, res){
	res.render('index', {title: 'About'})
};

