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
    var getOrder = function(locations) {
      return $http({
        url: ApiService.getEndpoint() + '/orders',
        params: {
          lat: locations.lat,
          lng: locations.lng
        },
        method: 'GET'
      });
    };

    // public api
    return {
      getOrders: getOrder
    };

  });
