'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:TaskDetailController
 * @description
 * # TaskDetailController
 */
angular.module('MyApp')
  .controller('TaskDetailController', function($scope, $stateParams,
    OrderService, $ionicLoading, $localStorage, $ionicHistory,
    $ionicPopup) {
    // do something with $scope
    $scope.order = $localStorage.getObject('taskDetail');

    function addDetailForScopeOrder() {
      if ($scope.order.orderType === 0) {
        $scope.order.orderType = 'Document';
      } else if ($scope.order.orderType === 1) {
        $scope.order.orderType = 'Small Parcel';
      } else if ($scope.order.orderType === 2) {
        $scope.order.orderType = 'Medium Parcel';
      } else if ($scope.order.orderType === 3) {
        $scope.order.orderType = 'Large Parcel';
      }

      if ($scope.order.status === 1) {
        $scope.order.currentStatus = 'To pick up';
      } else if ($scope.order.status === 2) {
        $scope.order.currentStatus = 'On delivery';
      } else if ($scope.order.status === 3) {
        $scope.order.currentStatus = 'Delivered';
      } else if ($scope.order.status === 4) {
        $scope.order.currentStatus = 'Completed';
      }
    }

    addDetailForScopeOrder();

    $scope.pickUpOrder = function() {
      $ionicLoading.show({
        template: 'Updating...'
      });
      OrderService.updateOrderStatus($scope.order.orderId, 'pickup', 2)
        .success(function(data) {
          $scope.order.status = 2;
          $scope.order.currentStatus = 'On delivery';
          $ionicLoading.hide();
        })
        .error(function(error) {
          $ionicLoading.hide();
          // display alert
          $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Oops',
              template: 'Something wrong here. Please try again.'
            });
            alertPopup.then(function() {});
          };
        });
    };

    $scope.orderDelivered = function() {
      $ionicLoading.show({
        template: 'Updating...'
      });
      OrderService.updateOrderStatus($scope.order.orderId, 'delivered', 3)
        .success(function(data) {
          console.log(data);
          $scope.order.status = 3;
          $scope.order.currentStatus = 'Delivered';
          $ionicLoading.hide();
        })
        .error(function(error) {
          // display alert
          $ionicLoading.hide();
          $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Oops',
              template: 'Something wrong here. Please try again.'
            });
            alertPopup.then(function() {});
          };
        });
    };
  });
