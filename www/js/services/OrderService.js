'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:OrderService
 * @description
 * # OrderService
 */
angular.module('MyApp')
  // use factory for services
  .factory('OrderService', function($http, ApiService) {
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

    var updateOrderStatus = function(orderId, operation, action, value) {
      return $http({
        url: ApiService.getEndpoint() + '/orders/' + orderId,
        data: {
          op: operation,
          action: action,
          value: value
        },
        method: 'PATCH'
      });
    };

    // public api
    return {
      getOrder: getOrder,
      getOrders: getOrders,
      updateOrderStatus: updateOrderStatus
    };

  });
