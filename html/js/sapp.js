(function(){

	var app = angular.module("sapp",['angularSpinner','ngMaterial', 'ngCookies']);

	// app.config( [
	// 	'$compileProvider',
	// 	function( $compileProvider )
	// 	{   
	// 		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
	// 		// Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
	// 	}
	// ]);

	app.factory('socket', function ($rootScope) {
		//http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/?redirect_from_locale=de
		var socket = io.connect(
			location.protocol + "//" + location.host + ":" + (location.port || 80),
		 	{path:"/ZDFxt/module/socialoptin/socket.io/"});

		return {
			on: function (eventName, callback) {
				socket.on(eventName, function () {  
					var args = arguments;
					$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
			emit: function (eventName, data, callback) {
				socket.emit(eventName, data, function () {
					var args = arguments;
					$rootScope.$apply(function () {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				})
			}
		};
	});


	app.factory('csc', function($rootScope){

		var storage = new CrossStorageClient('http://www.zdf.de/ZDFxt/module/socialoptin/hub.html',{
			timeout: 5000
		});


		return storage;
		// {
		// 	set: function(key, value){

		// 	},
		// 	get: function(key){

		// 		return "value";
		// 	}
		// }

		// storage.onConnect().then(function() {
		//   // Set a key with a TTL of 90 seconds
		//   return storage.set('newKey', 'foobar', 900000);
		// }).then(function() {
		//   return storage.get('newKey');
		// }).then(function(res) {
		//   console.log(res); // 2
		// }).catch(function(err) {
		//   // Handle error
		//   console.log("error xxx",err);
		// });

	})

	//app
	app.controller('SocialOption', ["$http","$scope", "socket", "csc", "$timeout",function($http, $scope, socket, csc, $timeout) {

		this.data = {};
		this.data.cb1 = {};
		this.data.firstName = "";
		self = this;

		this.save = function save ()
		{

			csc.onConnect().then(function() {
					return csc.set('data', self.data, 900000);
				}).then(function(res) {
					console.log("save");
					socket.emit("socket.save", self.data );
				}).catch(function(err) {
					console.log("error csc",err);
				});
		};


		this.load = function load(){

			csc.onConnect().then(function() {
					return csc.get('data');
				}).then(function(res) {
					console.log("load");
					$scope.sapp.data = res;
					$scope.$apply();
					socket.emit("socket.load", res );
				}).catch(function(err) {
					console.log("error csc",err);
				});

		};
				

		$timeout(function(){
			self.load();
		}, 2000);

	}]);


	//form
	app.controller("EmbeddcodeController", ["$http" , "socket", "$scope", 'usSpinnerService', function($http, socket, $scope, usSpinnerService){
		this.image = "";
		this.holder = true;
		var self = this;


		$scope.startSpin = function(){
			self.holder = true;
		    usSpinnerService.spin('spinner-1');
		}
		$scope.stopSpin = function(){
			self.holder = false;
		    usSpinnerService.stop('spinner-1');
		}

		socket.on('CodeComplete', function (doc) {
		    console.log("Generation complete");
		    $scope.stopSpin();

		    //window.xcode = atob(data.id);
		    //window.xscode = data.scripte;

		    //todo auf event umschreiben
		    var previewO = {};
		    	previewO.imageurl = "/c/twr/"+doc.id+"/preview";
		    	previewO.htmlcode = "/c/twr/"+doc.id+"/embed.html";

		    self.image = previewO.imageurl+"?"+ new Date().getTime();

		    //selfPower
			//document.getElementById('linkurl').value = location.origin + previewO.htmlcode;
			$scope.tapp.playoutUrl = location.origin + previewO.htmlcode;

			

			$http.get(previewO.htmlcode)
			.success( function(data, status, headers, config) {

				var localS = document.getElementById('codetextarea').value = data;
				// var iframe = document.createElement("iframe");
				// iframe.setAttribute("style","display: block;margin: 0 auto;min-width: 450;height: 500px;");
				// iframe.setAttribute("id","iframe_output");
				// iframe.setAttribute("src",x.htmlcode);
				
				// var iframe_output = document.getElementById('iframe_output');
				// document.getElementById('iframe_output').parentNode.replaceChild(iframe,iframe_output);
            
            });

		});		

		socket.on("ping", function(){
			console.log("ping");
		})


	}]);
	
})();


