'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:ConfirmOrderController
 * @description
 * # SettingsController
 */
angular.module('MyApp')
  .controller('ConfirmOrderController', function($scope, $stateParams,
    OrderService, $ionicLoading, $ionicHistory, $state) {
    // do something with $scope
    $scope.orderId = $stateParams.orderId;
    $ionicLoading.show({
      template: 'Loading...'
    });

    OrderService.updateOrderStatus($scope.orderId, 'confirm', 1)
      .success(function(data) {
        $ionicLoading.hide();

        $scope.order = data;
        if ($scope.order.orderType === 0) {
          $scope.order.orderType = 'Document';
        } else if ($scope.order.orderType === 1) {
          $scope.order.orderType = 'Small Parcel';
        } else if ($scope.order.orderType === 2) {
          $scope.order.orderType = 'Medium Parcel';
        } else if ($scope.order.orderType === 3) {
          $scope.order.orderType = 'Large Parcel';
        }
      })
      .error(function(error) {
        // display alert
        $ionicLoading.hide();
        console.log('an error occured', error);
      });

    $scope.goToTasks = function() {
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
        disableBack: true
      });
      $state.go('app.tasks');
    };
  });
