'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:DeliverController
 * @description
 * # DeliverController
 */
angular.module('MyApp')
  .controller('DeliverController', function($scope, $ionicLoading, socket,
    OrderService) {

    $scope.markers = [];
    $scope.orders = [];

    // Shared info window
    $scope.infoWindow = new google.maps.InfoWindow({
      content: 'This will show order info.',
      noSupress: true
    });

    // Adds a marker to the map and push to the array.
    function addMarker(location, type) {
      var iconUsed = type === 'me' ? {
        url: 'img/icon_deliver.png', // url
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)
      } : {
        url: 'img/icon_order2.png', // url
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)
      };

      var marker = new google.maps.Marker({
        position: location,
        map: $scope.map,
        icon: iconUsed
      });

      if (type !== 'me') {
        marker.addListener('click', function() {
          $scope.infoWindow.open($scope.map, marker);
        });
        marker.addListener('mousedown', function() {
          $scope.infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
      }
    }

    function getOrders(location) {
      OrderService.getOrders(location)
        .success(function(data) {
          $scope.orders = data;
          data.forEach(function(entry) {
            addMarker(new google.maps.LatLng(
              entry.location.coordinates[1],
              entry.location.coordinates[0]
            ));
          });
        })
        .error(function(error) {
          // display alert
          console.log('an error occured', error);
        });
    }

    $scope.initMap = function(map) {
      $scope.map = map;

      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        template: 'Getting current location'
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        var myLocation = new google.maps.LatLng(pos.coords.latitude,
          pos.coords.longitude);
        $scope.map.setCenter(myLocation);
        $scope.map.setZoom(15);

        addMarker(myLocation, 'me');

        var geoLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        getOrders(geoLocation);

        $ionicLoading.hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
    };

    socket.on('connect', function() {
      console.log('connected');
    });

  });
