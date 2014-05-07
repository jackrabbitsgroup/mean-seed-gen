/**
@module facebook
@class facebook

@toc
1. me
*/

'use strict';

var Q = require('q');
var lodash = require('lodash');
var request = require('request');

var dependency =require('../../../dependency.js');
var pathParts =dependency.buildPaths(__dirname, {});

var AuthMod =require(pathParts.controllers+'auth/auth.js');
var UserMod =require(pathParts.controllers+'user/user.js');

var self;

var defaults = {
};

/**
Sends the actual HTTP request
@toc 0.
@method sendRequest
@param {String} urlPart i.e. 'me'
@param {Object} reqParams Object to be used with `request` plugin; will be extended with some defaults
	@param {String} method One of 'post', 'get', etc.
	@param {Object} [json]
	@param {Object} [qs] GET params
@param {Object} [params]
*/
function sendRequest(urlPart, reqParams, params) {
	var ret ={msg: 'facebook sendRequest '};
	var deferred =Q.defer();
	var fullUrl ='https://graph.facebook.com/v2.0/'+urlPart;
	// var method ='get';
	var reqObj ={
		'url':fullUrl,
		// 'method':method,
	};
	reqObj =lodash.merge(reqObj, reqParams);
	request(reqObj, function(error, response, data)
	{
		console.log('reqObj return:');
		// console.log(response);
		console.log(data);
		if(error) {
			ret.msg +='request '+urlPart+' error: '+error+' ';
			console.log(ret.msg);
			deferred.reject(ret);
		}
		else {
			if(typeof(data) =='string') {
				try {
					data =JSON.parse(data);
				}
				catch(e) {
					console.log('data NOT JSON');
				}
			}
			if(data.error !==undefined) {
				ret.msg +='request '+urlPart+' ERROR: data: '+JSON.stringify(data)+' ';
				console.log(ret.msg);
				ret.data =data;
				deferred.reject(ret);
			}
			else {
				console.log(ret.msg+'request '+urlPart+' success: data: '+JSON.stringify(data));
				deferred.resolve(data);
			}
		}
	});
	return deferred.promise;
}

/**
Facebook module constructor
@class Facebook
@constructor
@param options {Object} constructor options
**/
function Facebook(options){
    this.opts = lodash.merge({}, defaults, options||{});

	self = this;
}

/**
@toc 1.
@method me
@param {Object} data
	@param {String} access_token The user access token to get user info for
@param {Object} params
@return {Object} (via Promise)
		@param {Number} code
		@param {String} msg
		@param {Object} user
**/
Facebook.prototype.me = function(db, data, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:'Facebook.me ', user:false};

	var reqObj ={
		method: 'get',
		qs: {
			access_token: data.access_token
		}
	};
	var promise =sendRequest('me', reqObj, {});
	promise.then(function(ret1) {
		//do user import & login
		var vals ={
			type: 'facebook',
			user: {
				first_name: ret1.first_name,
				last_name: ret1.last_name
			},
			socialData: {
				id: ret1.id,
				token: data.access_token
			}
		};
		if(ret1.email !==undefined) {
			vals.user.email =ret1.email;
		}
		
		AuthMod.socialLogin(db, vals, {})
		.then(function(retLogin) {
			deferred.resolve(retLogin);
		}, function(err) {
			deferred.reject(err);
		});
		
	}, function(err) {
		deferred.reject(err);
	});

	return deferred.promise;
};


/**
Module exports
@method exports
@return {Facebook} Facebook constructor
**/
module.exports = new Facebook({});