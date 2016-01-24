'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:TasksController
 * @description
 * # TasksController
 */
angular.module('MyApp')
  .controller('TasksController', function($scope,
    OrderService, $ionicLoading, $localStorage, $state, $ionicHistory) {
    // do something with $scope
    $ionicLoading.show({
      template: 'Loading...'
    });

    $scope.loadTasks = function() {
      OrderService.getOrdersForUser($scope.userId)
        .success(function(data) {
          $ionicLoading.hide();
          data.forEach(function(element) {
            element.currentStatus = getStatus(element.status);
            element.category = getOrderType(element.orderType);
          });
          $scope.orders = data;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .error(function(error) {
          // display alert
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
          alert('an error occured', error);
        });
    };

    $scope.$on('$ionicView.enter', function() {
      $scope.loadTasks();
    });

    $scope.goToTaskDetail = function(index) {
      $localStorage.setObject('taskDetail', $scope.orders[index]);
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: false,
        historyRoot: false
      });
      $state.go('app.taskdetail');
    };

    function getStatus(statusId) {
      if (statusId === 1) {
        return 'To pick up';
      } else if (statusId === 2) {
        return 'On delivery';
      } else if (statusId === 3) {
        return 'Delivered';
      } else if (statusId === 4) {
        return 'Completed';
      }
    }

    function getOrderType(orderType) {
      if (orderType === 0) {
        return 'Document';
      } else if (orderType === 1) {
        return 'Small Parcel';
      } else if (orderType === 2) {
        return 'Medium Parcel';
      } else if (orderType === 3) {
        return 'Large Parcel';
      }
    }
  });
