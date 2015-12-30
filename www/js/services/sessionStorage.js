'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:$sessionStorage
 * @description
 * # $sessionStorage
 */
angular.module('MyApp')
  .factory('$sessionStorage', function($window) {
    return {
      set: function(key, value) {
        $window.sessionStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.sessionStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.sessionStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.sessionStorage[key] || '{}');
      }
    };
  });
