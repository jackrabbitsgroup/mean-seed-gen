'use strict';

describe('SocketioCtrl', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('SocketioCtrl', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});