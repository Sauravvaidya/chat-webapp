angular
  .module('signin', [
    'ngMaterial',
    'users',
    'firebase',
    'ui.router'
  ])
  .controller('SigninController', function($scope, $rootScope, $state) {
  	$scope.user = {};
  	$scope.signin = function signin() {
  		$rootScope.name = $scope.user.name;
  		$state.go('chat');
  	}

    $scope.exchangePage = function exchangePage() {
      $state.go('exchange');
    }
  });