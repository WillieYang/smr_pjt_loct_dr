/* Get 'home' page. */
module.exports.locationList = function(req, res){
	res.render('locations_list', {
		title: 'Find places to work near you!',
		pageHeader: {
			title: 'Find places to work near you!'
		},
		locations: [{
			name: 'Starbucks',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food', 'Premium wifi'],
			distance: '100m'
		},{
			name: 'Cafe Hero',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 4,
			facilities: ['Hot drinks', 'Food', 'Premium wifi'],
			distance: '200m'
		},{
			name: 'Burger Queen',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 2,
			facilities: ['Food', 'Premium wifi'],
			distance: '250m'
		}] 
	})
};

/* Get 'location infomation' page. */
module.exports.locationInfo = function(req, res){
	res.render('location_info', {title: 'location Infomation'})
};

/* Get 'Add Review' page. */
module.exports.addReview = function(req, res){
	res.render('location_review_form', {title: 'Add Review'})
};