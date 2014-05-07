/**
@module facebook
@class facebookApi

@toc
1. rpcMe
*/

'use strict';

var lodash = require('lodash');
var inherits = require('util').inherits;

var dependency =require('../../../dependency.js');
var pathParts =dependency.buildPaths(__dirname, {});

// var Base = require('./base');
// var Base = require('../../../routes/api/base.js');		//can't pass this in since it's used with inherits (which has to be outside the function definition??)
var Base =require(pathParts.routes+'api/base.js');

var FacebookMod = require(pathParts.controllers+'facebook/facebook.js');

var sampleFacebookReturn = {
	_id: "objectid"
};

var defaults = {
	group: 'facebook',
	info: 'Facebook API',
	namespace: 'Facebook'
};

var db;

module.exports = FacebookApi;

/**
@param {Object} options
	@param {Object} db
*/
function FacebookApi(options){
	this.opts = lodash.extend({}, defaults, options||{});
	Base.call(this, this.opts);
	
	db =this.opts.db;
}

inherits(FacebookApi, Base);

FacebookApi.prototype.getRpcMethods = function(){
	return {
		me: this.rpcMe()
	};
};

/**
@toc 1.
@method rpcMe
**/
FacebookApi.prototype.rpcMe = function(){
	var self = this;

	return {
		info: 'Get the logged in user (the user with the access token)',
		params: {
			access_token: { type: 'string', required: true, info: "Access token for user to get" }
		},
		returns: {
			code: 'string',
			msg: 'string'
		},
		/**
		@method action
		@param {Object} params
			@param {Object} data
		@param {Object} out callback object which provides `win` and `fail` functions for handling `success` and `fail` callbacks
			@param {Function} win Success callback
			@param {Function} fail Fail callback
		**/
		action: function(params, out) {
			var promise =FacebookMod.me(db, params, {});
			promise.then(function(ret1) {
				out.win(ret1);
			}, function(err) {
				self.handleError(out, err, {});
			});
		}
	};
};