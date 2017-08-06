/* Get 'home' page. */
module.exports.homepage = function(req, res){
	res.render('home', {title: 'Find what you like!'})
};

/* Get 'about' page. */
module.exports.about = function(req, res){
	res.render('about', {
		user: req.user.username,
		userid: req.user._id,
		isAdmin: req.user.isAdmin,
		title: 'WELCOME',
		content: 'This location-based recommendation website is designed to provide \
			users some appropriate restaurants information in near 500 meters.\n\n In additon, there are\
			also many kinds of functionalities waiting for exploring.'

	})
};

