/* Get 'home' page. */
module.exports.homepage = function(req, res){
	res.render('index', {title: 'Oh! Wonderful!'})
};

/* Get 'about' page. */
module.exports.about = function(req, res){
	res.render('index', {title: 'About'})
};

