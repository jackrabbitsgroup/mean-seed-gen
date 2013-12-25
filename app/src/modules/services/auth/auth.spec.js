'use strict';

describe('appAuth', function(){
	var $rootScope ={}, $httpBackend, appAuth, $cookieStore, UserModel, appHttp, appConfig, appStorage;

	beforeEach(module('myApp'));
	
	beforeEach(inject(function(_$rootScope_, _$httpBackend_, _appAuth_, _$cookieStore_, _UserModel_, _appHttp_, _appConfig_, _appStorage_) {
		appHttp =_appHttp_;
		appAuth =_appAuth_;
		appStorage =_appStorage_;
		appConfig =_appConfig_;
		$cookieStore =_$cookieStore_;
		UserModel =_UserModel_;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should not check login status api if cookie isn\'t set', function() {
		var user ={
			_id: '2382aca',
			email: 'test@gmail.com'
		};
		appConfig.state.loggedIn =false;
		var promiseStorage =appStorage.delete1();		//ensure no local storage
		promiseStorage.then(function(ret1) {
			$cookieStore.remove('user_id');
			$cookieStore.remove('sess_id');
			
			var promise1 =appAuth.checkSess({});
			promise1.then(function(response) {
				expect(response.goTrig).toBe(true);
			});
			
			//get deferred to resolve
			// $rootScope.$apply();
			$rootScope.$digest();
		});
	});

	it('should not check login status api if already logged in', function() {
		var user ={
			_id: '2382aca',
			email: 'test@gmail.com',
			sess_id: '38asdflke'
		};
		appConfig.state.loggedIn =true;
		$cookieStore.put('user_id', user._id);
		$cookieStore.put('sess_id', user.sess_id);
		
		var promise1 =appAuth.checkSess({});
		promise1.then(function(response) {
			expect(response.goTrig).toBe(true);
		});
		
		//get deferred to resolve
		// $rootScope.$apply();
		$rootScope.$digest();
	});

	/*
	//@todo - get this to work - the promise for deleting localStorage isn't working so it's still set when go to appAuth.checkSess function..
	it('should check login status api if state.loggedIn is false and user cookie is set', function() {
		console.log('state.loggedIn false, user cookie set');
		var user ={
			_id: 'lkek23',
			email: 't@t.com',
			sess_id: '3lkasdljf'
		};
		
		$httpBackend.expectPOST('/api/auth/active').respond({result: {user: user} });
		// $httpBackend.when('POST', '/api/auth/').respond({result: {user: user} });
		
		appConfig.state.loggedIn =false;
		var promiseStorage =appStorage.delete1();		//ensure no local storage
		console.log('yes');
		promiseStorage.then(function(ret1) {
			console.log('promiseStorage success');
			$cookieStore.put('user_id', user._id);
			$cookieStore.put('sess_id', user.sess_id);
			
			//TESTING
			var cookieSess =$cookieStore.get('sess_id');
			var cookieUser =$cookieStore.get('user_id');
			console.log('cookies: '+cookieSess+' '+cookieUser);
			//end: TESTING

			var promise1 =appAuth.checkSess({});
			promise1.then(function(response) {
				expect(response.goTrig).toBe(false);
				//check to ensure user is saved properly in UserModel
				var userLoad =UserModel.load();
				expect(userLoad._id).toBeTruthy();
			});

			// $httpBackend.flush();
			// $rootScope.$apply();
			$rootScope.$digest();
			$httpBackend.flush();		//ORDER MATTERS - can NOT do this above the $rootScope.$digest/$apply!
		}, function(err) {
			console.log('promiseStorage err');
		});
	});
	*/
});

