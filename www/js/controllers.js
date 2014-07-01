// Open database

var db = window.openDatabase('AnniesBurger', '1.0', 'database', -1);

//Create database

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicLoading, MenuFeed) {


	// On load, get the latest data

	$scope.loadingIndicator = $ionicLoading.show({
	    content: 'Fetching Menu..',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 500
	});

	MenuFeed.getData().then(function(data){
		console.log(data.status);
		if(data.status == 200)
		{
			$ionicLoading.hide();
		}
	});

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
				   	//console.log(results.rows.item(i));
				  }

				  //console.log(list);
				  $scope.items = list;
				  $scope.$apply();
			});


	});

})

.controller('PlaylistDetailCtrl', function($scope, $stateParams, MenuFeed) {
	//console.log($stateParams.id);

	//var getId = $stateParams.id;


	db.transaction(function (px) {
        px.executeSql('SELECT * FROM menu WHERE id = "'+ $stateParams.id +'"', [], function(test, test2){
          //console.log(test2.rows.item(0));

        $scope.$apply(function () {
          $scope.items = test2.rows.item(0);
        });

        });

        //console.log(results.rows.item(i));
      });

})