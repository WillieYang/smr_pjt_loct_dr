/* Get 'home' page. */
module.exports.homepage = function(req, res){
	res.render('index', {title: 'Find what you like!'})
};

/* Get 'about' page. */
module.exports.about = function(req, res){
	res.render('about', {title: 'About'})
};

