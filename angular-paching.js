/**
* @ngdoc 
* @name 
* @description 
* @require 
*/

'use strict';
(function(){

	angular
		.module('paching', [])
		.provider('pachingConfig', function () {
    
		    // defaults
		    this.config = {
				token:"",
				timeout:5000,
				threshold:1,
				domain: "pcg.io",
				protocol:"http"
			};

		    this.$get = function() {

				return {
					token: this.config.token,
					timeout: this.config.timeout,
					threshold: this.config.threshold,
					domain: this.config.domain,
					protocol: this.config.protocol,
					getUrl: function(endpoint){
						if(!endpoint){
							endpoint = "";
						}
						undefined://http/hits?token=igi9zzp1&token=igi9zzp1
			    		return this.protocol + '://' + this.domain + '/' + endpoint;
			    	}
				};
		    };

		    this.configure = function(config){
				if(typeof config != "object"){
					console.log('Error: Please supply a valid config object');
				}
				
				if(config.token && config.token.length){
					this.config.token = config.token;
				}else{
					console.log('Error: Please supply a valid token');
				}

				if(config.protocol && config.protocol.length){
					this.config.protocol = config.protocol;
				}
				if(config.domain && config.domain.length){
					this.config.domain = config.domain;
				}

				if(config.timeout && typeof threshold == "number"){
					this.config.timeout = config.timeout;
				}

				if(config.threshold && typeof threshold == "number"){
					this.config.threshold = config.threshold;
				}
			}
		})
		.service('pachingAdService', [
			
			'$q',
			'$http',
			'pachingConfig',

			function($q, $http, pachingConfig){

				var paching = {};

				paching.getLinkData = function(){
					var q = $q.defer();
					$http({
						'method': 'POST',
						'url': pachingConfig.getUrl('hits'),
						'data': {fingerprint: createFingerprint()},
						'params': {'token':pachingConfig.token}
					})
						.then(function succesCallback (link) {
							if(link.data && link.data.threshold >= pachingConfig.threshold){
								if(!link.type){
									link.type = "";
								}
								if(!link.description){
									link.description = "";
								}
								q.resolve(link);
							}else{
								q.reject(link);
							}

						},function errorCallback (error) {
							q.reject(error);
						})
					return q.promise;
				}

				paching.regiserUser = function(userId, link){
					if(!userId || !link){
						return false;
					}

					var q = $q.defer();

					$http({
						'method': 'POST',
						'url': pachingConfig.getUrl('adsUsers'),
						'data': {'remoteUserId':userId,'linkId':link.id},
						'params': {'token':pachingConfig.token}
					})
						.then(function succesCallback(user){
							q.resolve(user);
						}, function errorCallback(error){
							q.reject(error);
						});

					return q.promise;
				}

				paching.regiserPayment = function(userId, productId, productName, productType, productPrice){
					if(!userId || !productId || !productType || !productPrice || !productName){
						return false;
					}

					var q = $q.defer();

					$http({
						'method': 'POST',
						'url': pachingConfig.getUrl('adsProducts'),
						'data': {
							'remoteUserId': userId,
							'remoteProductId': productId,
							'productPrice': productPrice,
							'productName': productName,
							'productType':productType
						},
						'params': {'token':pachingConfig.token}
					})
						.then(function succesCallback(payment){
							q.resolve(payment);
						}, function errorCallback(error){
							q.reject(error);
						});

					return q.promise;
				}

				function createFingerprint() {

					var screenDimentions = {
						height: window.innerHeight,
						width: window.innerWidth
					};

					window.screen.screenDimentions = screenDimentions;

					var fingerprint = JSON.stringify( 
						window.screen, 
						[
							"availHeight",
							"availLeft",
							"availTop",
							"availWidth",
							"colorDepth",
							"height",
							"orientation",
							"pixelDepth",
							"width",
							"screenDimentions"
						]
					);

					return fingerprint;	
				}

				return paching;
			}
		]);
})();