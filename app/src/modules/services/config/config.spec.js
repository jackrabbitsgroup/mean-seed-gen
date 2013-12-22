'use strict';

describe('appConfig', function(){
	var $rootScope ={}, appConfig;

	beforeEach(module('myApp'));
	
	beforeEach(inject(function(_$rootScope_, _appConfig_) {
		$rootScope = _$rootScope_;
		appConfig =_appConfig_;
	}));

	// afterEach(function() {
	// });

	it('should work', function() {
	});
});

