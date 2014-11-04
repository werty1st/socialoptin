(function(){
	var app = angular.module("sapp",["frapontillo.bootstrap-switch"]);


	//redirect if not zdf.de
	if (location.hostname !== "www.zdf.de")
		window.location = "http://www.zdf.de/ZDFxt/module/socialoptin/settings/";

	

	app.factory('csc', function($rootScope){

		var storage = new CrossStorageClient('http://www.zdf.de/ZDFxt/module/socialoptin/hub.html',{
			timeout: 3000,
			promise: ES6Promise.Promise
		});
		
		return storage;
	})

	//app
	app.controller('SocialOption', function($http, $scope, csc, $timeout, $log) {

		
		$scope.socialButton = false;
		$scope.settingsLoaded = false;
		$scope.isEnabled = false;
		$scope.onText= "Einverstanden";
		$scope.offText= "Ablehnen";
		$scope.sizecss= 200;

		$scope.init = true;


		$scope.$watch('socialButton', function(data) {
		  if ($scope.init) {
		  	$scope.init = false;
		  	return;
		  }
		  $log.info('Selection changed.');
		  console.log("init",data);
		  $scope.save(data);
		});

		$scope.save = function save (data)
		{

			csc.onConnect().then(function() {
					return csc.set('social', data);

				}).then(function(res) {
					console.log("save");

				}).catch(function(err) {
					if(err.message == "Invalid permissions for set"){
						alert("Änderungen sind nur über die zdf.de Domain zulässig.");
					}
					console.log("error csc",err);
				});
		};


		$scope.load = function load(){

			csc.onConnect().then(function() {
					return csc.get('social');

				}).then(function(res) {
					console.log("load");
					$scope.socialButton = (res===false)?false:true;
					$scope.settingsLoaded = $scope.isEnabled = true;
					$scope.$apply();

				}).catch(function(err) {
					$scope.settingsLoaded = $scope.isEnabled = true;
					$scope.$apply();
					console.log("error csc",err);
				});
		};
				



		$timeout(function(){
			$scope.load();
		}, 2000);

	});



	
})();


