// Open database

var db = window.openDatabase('AnniesBurger', '1.0', 'database', -1);

//Create database

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope, MenuFeed) {

  //$scope.items = [];


  // Somehow conver to get data from DB
	MenuFeed.getData().then(function() {
    	db.transaction(function(tx) {
	    	tx.executeSql("select * from menu;", [], function(tx, results) {
	            console.log(results.rows);
	            $scope.items = results.rows;
	         });
	    });

	});


	// Load from database

})

.controller('PlaylistDetailCtrl', function($scope, $stateParams, MenuFeed) {

	MenuFeed.getDataDetail($stateParams.objectId).then(function(data){
    	$scope.items = data.data.data;
    	console.log(data.data.data);
  });


})