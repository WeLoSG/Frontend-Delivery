'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:AccountController
 * @description
 * # AccountController
 */
angular.module('MyApp')
  .controller('AccountController', function($scope, $state, $localStorage,
    $ionicHistory) {

    $scope.user = $localStorage.getObject('user');

    $scope.logout = function() {
      $localStorage.remove('token');
      $localStorage.remove('user');
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });
      $state.go('app.login');
    };
  });
