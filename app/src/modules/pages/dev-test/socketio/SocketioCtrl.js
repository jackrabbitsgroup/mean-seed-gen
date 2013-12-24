/**
@todo
- switch to wrapping socket in a service (i.e. use angular-socket-io or ng-socket once they support setting (more than one) connect address)
	- https://github.com/btford/angular-socket-io
		- https://github.com/btford/angular-socket-io/pull/16
	- https://github.com/chrisenytc/ng-socket
*/

'use strict';

angular.module('myApp').controller('SocketioCtrl', ['$scope', 'appConfig',
function($scope, appConfig) {

	$scope.socketData =[];
	
	$scope.formVals ={
	};
	
	var serverPath = appConfig.dirPaths.serverPath+'test';
	var socket = io.connect(serverPath);
	socket.on('connect', function() {
		console.log('socket connected on channel: test');
	});
		
	/**
	@param {Object} data
		@param {Object} data The original / raw passed in data
	*/
	socket.on('doStuff', function(data) {
		console.log('socket.on event: doStuff');
		//add new data to BEGINNING of array
		$scope.socketData =[data.data].concat($scope.socketData);
		//ensure back in Angular world
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	});
	
	$scope.addMessage =function(params) {
		socket.emit('doStuff', {msg: $scope.formVals.socketMsg});
		$scope.formVals.socketMsg ='';		//reset
	};
	
}]);