var app=angular.module('chirpApp',['ngRoute','ngResource']).run(function($rootScope){
	$rootScope.authenticated=false;
	$rootScope.current_user='';

	$rootScope.signout()= function(){
		$http.get('/auth/signout');
		$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl: 'main.html',
		controller: 'mainController'
	})

	.when('/login',{
		templateUrl: 'login.html',
		controller: 'authController'
	})

	.when('/register',{
		templateUrl: 'register.html',
		controller: 'authController'
	});
});

app.controller('mainController',function($scope){
	$scope.posts=[];
	$scope.newPost= {created_by: '', text: '', created_at: ''};

	$scope.post=function(){
		$scope.newPost.created_at= Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost={created_by: '',text: '',created_at: ''};
	};

});

app.controller('authController',function($scope,$http,$rootScope,$location){
	$scope.user={username: '', password: ''};
	$scope.error_message='';

	$scope.login= function(){

		$http.post('/auth/login',$scope.user).success(function(data){
			if(data.state=='success'){
				$rootScope.authenticated=true;
				$rootScope.current_user=data.user.username;
				$location.path('/');
			}

			else{
				$scope.error_message=data.message;
			}
		});
	};

	$scope.register=function(){

		$http.post('/auth/signup',$scope.user).success(function(data){
			if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
		});
		$scope.error_message='registration request for'+ $scope.user.username;
	};
	
});
