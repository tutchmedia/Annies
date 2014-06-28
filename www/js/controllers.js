angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope, MenuFeed) {

  //$scope.items = [];

	MenuFeed.getData().then(function(data) {
    	$scope.items = data.data.data;
    	console.log(data.data.data);
	});

})

.controller('PlaylistDetailCtrl', function($scope, $stateParams, MenuFeed) {

	MenuFeed.getDataDetail($stateParams.objectId).then(function(data){
    	$scope.items = data.data.data;
    	console.log(data.data.data);
  });


})