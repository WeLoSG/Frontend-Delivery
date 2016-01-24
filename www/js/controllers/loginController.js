'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:LoginController
 * @description
 * # LoginController
 */
angular.module('MyApp')
  .controller('LoginController', function($scope, $state, $ionicHistory,
    $localStorage, UserService, $ionicPopup) {

    $scope.credential = {
      email: '',
      password: '',
      isDriver: true
    };

    $scope.showAlert = function(text) {
      $ionicPopup.alert({
        title: 'Oops',
        template: text
      });
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
            $scope.showAlert('Please check your email and password.');
          }
        })
        .error(function(error) {
          $scope.showAlert('Login Failed! <br>Please try again.');
        });
    };

    $scope.$on('$ionicView.beforeEnter', function() {
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
        disableBack: true
      });
      if ($localStorage.get('token')) {
        $state.go('app.home');
      }
    });
  });
