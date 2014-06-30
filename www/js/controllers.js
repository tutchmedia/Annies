// Open database

var db = window.openDatabase('AnniesBurger', '1.0', 'database', -1);

//Create database

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope, MenuFeed) {

  //$scope.items = [];
  var list = [];

  // Somehow conver to get data from DB
    		db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM menu ORDER BY item_name ASC', [], function (tx, results) {
				  var len = results.rows.length, i;
				  for (i = 0; i < len; i++) {
				  	//$scope.items = results.rows.item(i);
				  	list.push(results.rows.item(i));
				   	console.log(results.rows.item(i));
				  }

				  console.log(list);
				  $scope.items = list;
				  $scope.$apply();
			});


	});

})

.controller('PlaylistDetailCtrl', function($scope, $stateParams) {
	//console.log($stateParams.id);

	var getId = $stateParams.id;

	db.transaction(function (px) {
		px.executeSql('SELECT * FROM menu WHERE id = "'+ getId +'"', [], function(test, test2){
			console.log(test2.rows.item(0));
			trial = test2.rows.item(0);
			$scope.items = trial;

		});

		//console.log(results.rows.item(i));
	});


})