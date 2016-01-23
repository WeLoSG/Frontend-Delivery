'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:LoginController
 * @description
 * # LoginController
 */
angular.module('MyApp')
  .controller('LoginController', function($scope, $state, $ionicHistory,
    $localStorage, UserService) {

    $scope.credential = {
      email: '',
      password: '',
      isDriver: true
    };

    $scope.userLogin = function() {
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
        disableBack: true
      });
      UserService.login($scope.credential.email, $scope.credential.password)
        .success(function(data) {
          if (data.status === 'success') {
            $localStorage.set('token', data.welo_token);
            $localStorage.setObject('user', data.user);
            $state.go('app.home');
          } else {
            console.log('login failed');
          }
        })
        .error(function(error) {
          console.log(error);
        });
    };
  });
