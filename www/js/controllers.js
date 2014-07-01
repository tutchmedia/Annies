// Open database

var db = window.openDatabase('AnniesBurger', '1.0', 'database', -1);

//Create database

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope, MenuFeed) {

  //$scope.items = [];

	MenuFeed.getData().then(function(data) {
    	$scope.items = data.data.data;
    	var my_data = data.data.data;

    	//console.log("row: " + JSON.stringify(data.data.data));


    	// SQL start

    	db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS menu');
        tx.executeSql('CREATE TABLE IF NOT EXISTS menu (id text PRIMARY KEY, item_name text, item_price real)');

        // Insert data into the database

        var sql = "INSERT OR REPLACE INTO menu (id, item_name, item_price) VALUES (?, ?, ?)";

        for (var i in my_data) {
        	//for each row, insert into the table
			item = my_data[i];
        	var params = [item.objectId, item.item_name, item.item_price];
        	tx.executeSql(sql, params);
		}



        }, function(e) {
          console.log("ERROR: " + e.message);
        });
	});

})

.controller('PlaylistDetailCtrl', function($scope, $stateParams, MenuFeed) {

	MenuFeed.getDataDetail($stateParams.objectId).then(function(data){
    	$scope.items = data.data.data;
    	console.log(data.data.data);
  });


})
