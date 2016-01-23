'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:ValidationService
 * @description
 * # ValidationService
 */
angular.module('MyApp')
  // use factory for services
  .factory('ValidationService', function($http, $timeout, $q) {

    var isEmpty = function(val) {
      if (val === '' || val == null) {
        return true;
      } else {
        return false;
      }
    };

    var isEmail = function(val) {
      var re = /\S+@\S+\.\S+/;
      return re.test(val);
    };

    var isEqual = function(val_1, var_2) {
      return val_1 === var_2;
    };

    // public api
    return {
      isEmpty: isEmpty,
      isEmail: isEmail,
      isEqual: isEqual
    };

  });
