'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:ConfirmOrderController
 * @description
 * # SettingsController
 */
angular.module('MyApp')
  .controller('ConfirmOrderController', function($scope, $ionicModal,
    OrderService, $ionicLoading, $ionicHistory, $state, $localStorage) {

    $scope.order = $localStorage.getObject('confirmedDeliverOrder');
    if ($scope.order.orderType === 0) {
      $scope.order.orderType = 'Document';
    } else if ($scope.order.orderType === 1) {
      $scope.order.orderType = 'Small Parcel';
    } else if ($scope.order.orderType === 2) {
      $scope.order.orderType = 'Medium Parcel';
    } else if ($scope.order.orderType === 3) {
      $scope.order.orderType = 'Large Parcel';
    }

    $scope.goToTasks = function() {
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
        disableBack: true
      });
      $localStorage.remove('confirmedDeliverOrder');
      $state.go('app.tasks');
    };
  });
