'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:RegisterController
 * @description
 * # RegisterController
 */
angular.module('MyApp')
  .controller('RegisterController', function($scope, $state, $ionicHistory,
    $localStorage, $ionicPopup, UserService, ValidationService) {
    $scope.registration = {
      email: '',
      name: '',
      ic: '',
      vehiceNumber: '',
      drivingLicense: '',
      password: '',
      repassword: '',
      contact: ''
    };

    function validateInfo() {
      var error_msg = '';

      if (!ValidationService.isEmail($scope.registration.email)) {
        error_msg = 'Please enter a valid email address!';
      } else if (ValidationService.isEmpty($scope.registration.name)) {
        error_msg = 'Please enter a valid name!';
      } else if (ValidationService.isEmpty($scope.registration.ic)) {
        error_msg = 'Please enter a valid ic!';
      } else if (ValidationService.isEmpty($scope.registration.vehiceNumber)) {
        error_msg = 'Please enter a valid vehice number!';
      } else if (ValidationService.isEmpty($scope.registration.drivingLicense)) {
        error_msg = 'Please enter a valid driving license!';
      } else if (ValidationService.isEmpty($scope.registration.password)) {
        error_msg = 'Please enter a password!';
      } else if (ValidationService.isEmpty($scope.registration.repassword)) {
        error_msg = 'Please enter the password again!';
      } else if (ValidationService.isEmpty($scope.registration.contact)) {
        error_msg = 'Please enter a valid contact number!';
      } else if (!ValidationService.isEqual($scope.registration.password,
          $scope.registration.repassword)) {
        error_msg = 'Two passwords does not match!';
      } else {
        error_msg = '';
      }

      return error_msg;
    }

    $scope.userRegister = function() {
      console.log($scope.registration);
      var error_msg = validateInfo();

      if (error_msg === '') {
        UserService.register($scope.registration.email, $scope.registration
            .name, $scope.registration.ic, $scope.registration.password,
            $scope.registration.vehiceNumber, $scope.registration.drivingLicense,
            $scope.registration.contact)
          .success(function(data) {
            console.log(data);
            $ionicHistory.nextViewOptions({
              historyRoot: true,
              disableAnimate: true,
              disableBack: true
            });
            if (data.status === 'success') {
              $localStorage.set('token', data.welo_token);
              $localStorage.setObject('user', data.user);
              $state.go('app.home');
            } else {
              $ionicPopup.alert({
                title: 'Error',
                template: 'Register failed'
              });
              console.log('register failed');
            }
          })
          .error(function(error) {
            $ionicPopup.alert({
              title: 'Error',
              template: error.error
            });
          });
      } else {
        $ionicPopup.alert({
          title: 'Wrong Information!',
          template: error_msg
        });
      }
    };
  });
