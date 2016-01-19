'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:OrderService
 * @description
 * # OrderService
 */
angular.module('MyApp')
  // use factory for services
  .factory('OrderService', function($http, ApiService, $sessionStorage) {
    var getOrders = function(locations) {
      return $http({
        url: ApiService.getEndpoint() + '/orders',
        params: {
          lat: locations.lat,
          lng: locations.lng
        },
        method: 'GET'
      });
    };

    var getOrder = function(orderId) {
      return $http({
        url: ApiService.getEndpoint() + '/orders/' + orderId,
        method: 'GET'
      });
    };

    var getOrdersForUser = function(userId) {
      return $http({
        url: ApiService.getEndpoint() + '/orders/deliver/' + userId,
        method: 'GET'
      });
    };

    var updateOrderStatus = function(orderId, operation, action, value) {
      var deliverId = $sessionStorage.get('userid');
      return $http({
        url: ApiService.getEndpoint() + '/orders/' + orderId,
        data: {
          op: operation,
          action: action,
          value: value,
          deliverId: deliverId
        },
        method: 'PATCH'
      });
    };

    // public api
    return {
      getOrder: getOrder,
      getOrders: getOrders,
      getOrdersForUser: getOrdersForUser,
      updateOrderStatus: updateOrderStatus
    };

  });
