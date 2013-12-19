'use strict';

describe('UserDeleteCtrl', function(){
	var $ctrl, $scope ={};

	// beforeEach(function(){
	// });
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$scope = _$rootScope_.$new();
		$ctrl = _$controller_('UserDeleteCtrl', {$scope: $scope});
	}));
	
	// it('should be called', function() {
	// });
});