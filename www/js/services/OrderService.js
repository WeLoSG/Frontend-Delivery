'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:OrderService
 * @description
 * # OrderService
 */
angular.module('MyApp')
  // use factory for services
  .factory('OrderService', function($http, ApiService, $localStorage) {
    var token = $localStorage.get('token');
    var getOrders = function(locations) {
      return $http({
        url: ApiService.getEndpoint() + '/orders',
        params: {
          lat: locations.lat,
          lng: locations.lng,
          welo_token: token
        },
        method: 'GET'
      });
    };

    var getOrder = function(orderId) {
      return $http({
        url: ApiService.getEndpoint() + '/orders/' + orderId,
        params: {
          welo_token: token
        },
        method: 'GET'
      });
    };

    var getOrdersForUser = function(userId) {
      return $http({
        url: ApiService.getEndpoint() + '/orders/deliver',
        params: {
          welo_token: token
        },
        method: 'GET'
      });
    };

    var updateOrderStatus = function(orderId, operation, action, value) {
      return $http({
        url: ApiService.getEndpoint() + '/orders/' + orderId,
        data: {
          op: operation,
          action: action,
          value: value
        },
        params: {
          welo_token: token
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
