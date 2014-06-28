var db = new PouchDB('menu');
var remoteCouch = 'http://tutchmedia:jesta123@annies.iriscouch.com/menu';

//Sync

function sync() {
  //syncDom.setAttribute('data-sync-state', 'syncing');
  console.log("Syncing");
  var opts = {live:true};
  //db.replicate.to(remoteCouch, opts, syncError);
  db.replicate.from(remoteCouch, opts, syncError);
}

function syncError() {
  //syncDom.setAttribute('data-sync-state', 'error');
  console.log("Sync Error");
}



// ****************** MODULE START ******************************


angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {

	$scope.menus = [];	


	$scope.loadMenu = function(menus) {

		// Before drawing the elements on the page, clear and reload the data (Does not delete from database)

		$scope.menus = [];

        for (var i = 0; i < menus.length; i++) {
        	//console.log(menus);
            var menu = menus[i];
            //console.log(menu);
            db.get(menu.id, function(err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    $scope.$apply(function() {
                        $scope.menus.push(doc);
                        console.log(doc);
                    });
                }
            });
        };
    }

    function showMenu() {
		db.allDocs({include_docs: true, descending: false}, function(err, doc) {
      if(err)
      {
        conesole.log(err);
      } else {
		    $scope.loadMenu(doc.rows);
      }

		});
	}

	db.info(function(err, info) {
	  db.changes({
	    since: info.update_seq,
	    live: true
	  }).on('change', showMenu);
	});



	//showMenu();

  $scope.refreshList = function() {
    console.log("Refreshed");
    showMenu();
  };

  $scope.refreshList();

})

.controller('MenuDetailCtrl', function($scope, $stateParams) {

	$scope.detail = [];

	db.get($stateParams.id, function(err, doc) {
		if (err) {
            console.log(err);
        }
        else {
			//console.log(doc);

			$scope.$apply(function() {
                //$scope.detail.push(doc);
                $scope.detail = doc;
            });

		}

		
	});


})