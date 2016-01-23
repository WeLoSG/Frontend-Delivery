'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:MainController
 * @description
 * # MainController
 */
angular.module('MyApp')
  .controller('MainController', function($scope, $localStorage, $state,
    $ionicHistory) {
    $scope.$on('$ionicView.enter', function() {
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
        disableBack: true
      });
      if (!$localStorage.get('token') && !$state.includes('app.register') &&
        !$state.includes('app.login')) {
        $state.go('app.login');
      }
    });
  });
