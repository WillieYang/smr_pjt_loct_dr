/* Get 'home' page. */
module.exports.homepage = function(req, res){
	res.render('index', {title: 'Find what you like!'})
};

/* Get 'about' page. */
module.exports.about = function(req, res){
	res.render('about', {
		title: 'About',
		content: 'This is a recommendation website created which is used to provide \
			users some nearby appropriate restaurants or shops.\n\n In fact, this web\
			application is part of my summer project, and the aim is to build the \
			application using MEAN stack, and comparing it with LAMP. \n\nIn this \
			specific project, I would use MEAN stack(AngularJS as client-side framework,\
			Express.js as server-side web-application framework, Node.js as server-side \
			platform and MongoDB as database) to develop that E-business web site, and \
			comparing all the components in MEAN stack with other corresponding techs in\
			the area of front and back end, server and database to improve user’s \
			experience to some degree. For instance, the pros and cons in relational\
			 database and NoSQL, the advantageous when using Node.js as server.'

	})
};

