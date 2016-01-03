'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('MyApp')
  .controller('HomeController', function($scope, $state, $ionicHistory) {
    $scope.goToDeliverPage = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });

      $state.go('app.deliver');
    };
  });
