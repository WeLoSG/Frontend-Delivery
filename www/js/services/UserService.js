'use strict';

angular.module('MyApp')
  // use factory for services
  .factory('UserService', function(ApiService, $http, $timeout, $q) {

    var loginUser = function(email, password) {
      return $http({
        url: ApiService.getEndpoint() + '/users/login',
        data: {
          email: email,
          password: CryptoJS.SHA1(password).toString(),
          isDriver: true
        },
        method: 'POST'
      });
    };

    var registerUser = function(email, name, ic, password, vehiceNumber,
      drivingLicense, contact) {
      return $http({
        url: ApiService.getEndpoint() + '/users',
        data: {
          user: {
            email: email,
            name: name,
            ic: ic,
            vehiceNumber: vehiceNumber,
            drivingLicense: drivingLicense,
            password: CryptoJS.SHA1(password).toString(),
            phone: contact,
            isDriver: true
          }
        },
        method: 'POST'
      });
    };

    // public api
    return {
      login: loginUser,
      register: registerUser
    };

  });
