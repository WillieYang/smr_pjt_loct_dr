var locationListCtrl = function($scope){
	$scope.data = {
		locations: [{
			name: "Sinsbury's local",
			address: "301 Burgess Road, Southampton, SO16 3BA",
			rating: 5,
			facilities : ["Hot drinks","Food","Premium wifi"],
			distance: '100m',
			_id: "5937bcdb8f3da38b9429bba1"
		}, {
			name: "Tesco Express",
			address: "207 Burgess Road, Southampton, SO16 3BE",
			rating: 4,
			facilities : ["Drinks","Food","Fruits"],
			distance: '120m',
			_id: "5937c1ce8f3da38b9429bba5"
		}]
	};
};

angular.module('smrApp', [])
	   .controller('locationListCtrl', locationListCtrl); 