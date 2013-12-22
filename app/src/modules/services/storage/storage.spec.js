'use strict';

describe('appStorage', function(){
	var $rootScope ={}, appStorage;

	beforeEach(module('myApp'));
	
	beforeEach(inject(function(_$rootScope_, _appStorage_) {
		$rootScope = _$rootScope_;
		appStorage =_appStorage_;
	}));

	// afterEach(function() {
	// });

	it('should reject if try to read non-existent key', function() {
		var errorCalled =false;
		appStorage.read('badKey', {}).
		then(function(ret) {
		}, function(err) {
			errorCalled =true;
		});
		$rootScope.$digest();
		expect(errorCalled).toBe(true);
	});
	
	it('should delete all keys if no key specified', function() {
		appStorage.delete1();
		$rootScope.$digest();
		appStorage.delete1(undefined, {});
		$rootScope.$digest();
	});
	
	it('should save and remove keys', function() {
		appStorage.save('key1', 'val1', {});
		appStorage.save('key2', {p1:'val1'}, {});
		
		//should remove just ONE key
		appStorage.delete1('key1');
		$rootScope.$digest();
		
		//should delete all
		appStorage.delete1();
		$rootScope.$digest();
	});
	
	it('should overwrite same key', function() {
		appStorage.save('key1', 'val1', {});
		appStorage.save('key1', {p1:'val1'}, {});
	});
});

