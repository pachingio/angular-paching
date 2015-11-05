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
				protocol:"https"
			};

		    this.$get = function() {
		      return {
		        token: this.config.token,
		        timeout: this.config.timeout,
		        threshold: this.config.threshold
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

				paching.getLinkData = function(){
					var q = $q.defer();
					$http.post(
						pachingConfig.protocol + '://' + pachingConfig.domain + '/?token=' + pachingConfig.token,
						{fingerprint: createFingerprint()})
						.then(function succesCallback (link) {
							if(link.data && link.data.threshold >= pachingConfig.threshold){
								q.resolve(link);
							}else{
								q.reject(link);
							}

						},function errorCallback (error) {
							q.reject(error);
						})
					return q.promise;
				}

				function createFingerprint(argument) {

					return fingerprint;	
				}
			};
		]);
})();