angular.module('starter.services', [])

	.factory('MenuFeed', function($http) {
	  return {
	    getData: function() {
	      var myHeader = {headers: {
	      	'Application-id': '57F10D40-71E9-ECA4-FF91-BFFF32447B00',
	      	'secret-key': '3DA0535C-B03C-518B-FFFB-27483BAA3F00'
	    }}

	      return $http.get('https://api.backendless.com/v1/data/menu', myHeader).success(function (data) {
	        return data.data;
	      });
	    }
	  }
	});