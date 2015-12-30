'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:$localstorage
 * @description
 * # $localstorage
 */
angular.module('MyApp')
  .factory('$localstorage', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    };
  });
