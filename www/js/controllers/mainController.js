'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:MainController
 * @description
 * # MainController
 */
angular.module('MyApp')
  .controller('MainController', function($scope, $sessionStorage) {
    // init user id if not existed
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + s4();
    }

    if (!$sessionStorage.get('userid', null)) {
      $sessionStorage.set('userid', guid());
    }
  });
