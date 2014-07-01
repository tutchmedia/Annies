angular.module('starter.services', [])

.factory('MenuFeed', function($http) {
  return {
    getData: function() {
      // Set header
	  
	  var myHeader = {headers: {
            'Application-id': '57F10D40-71E9-ECA4-FF91-BFFF32447B00',
            'secret-key': '3DA0535C-B03C-518B-FFFB-27483BAA3F00'
			}
		};

      return $http.get('https://api.backendless.com/v1/data/menu', myHeader).success(function (data) {

      // After returning the data, insert it into the table from here ready for the controller to pull from the db directly

      var my_data = data.data;

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
    },
    getDataDetail: function(itemId) {

      

    }
  }
});