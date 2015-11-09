# angular-paching


This plugin allows your app to

1. Configure Paching user credentials
2. Configure Paching to work with your app
3. Build device fingerprint
4. Get get add data available for user account available

POST

https://api.pcg.io/link-clicks?token={token}

{
	fingerprint: ""
}

Example Angular Controller

angular.app('yourApp', ['paching'])
	.config([
		'pachingConfigProvider',
		function(pachingConfig){
			pachingConfigProvider.configure({
				token:"",
				timeout:5000,
				threshold:1,
				domain: "pcg.io",
				protocol:"https"
			});
		}
	])
	.controller('myController', [
		'pachingAdService',
		function(pachingAdService){
			pachingAdService.getLinkData()
				.then(function getPachingLinkData(link){
					console.log("Link Data from your Ad", link);
				})
				.catch(function getPachingLinkDataError(error){
					console.log(
						"data was not found or did not meet the required match threshold", 
						error
					);
				})
		}])