'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:socket
 * @description
 * # socket
 */
angular.module('MyApp')
  // use factory for services
  .factory('socket', function($rootScope, ApiService) {
    var socket = io.connect(ApiService.getEndpoint());
    return {
      on: function(eventName, callback) {
        socket.on(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },
      emit: function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  });
