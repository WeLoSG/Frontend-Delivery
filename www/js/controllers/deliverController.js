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
    $scope.currentMarker = null;
    $scope.currentLocation = null;

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
      } else {
        $scope.currentMarker = marker; // update current marker
      }
    }

    function getOrders(location) {
      OrderService.getOrders(location)
        .success(function(data) {
          $scope.markers = []; // clear cached markers
          $scope.orders = data; // reset orders data on map
          data.forEach(function(entry) {
            addMarker(new google.maps.LatLng(
              entry.location.coordinates[1],
              entry.location.coordinates[0]
            ));
          });
        })
        .error(function(error) {
          // display alert
          alert('an error occured', error);
        });
    }

    function centerMyLocation() {
      var myLocation = new google.maps.LatLng(
        $scope.currentLocation.coords.latitude,
        $scope.currentLocation.coords.longitude
      );
      $scope.map.panTo(myLocation);
    }

    function updateMyLocation(location) {
      var myLocation = new google.maps.LatLng(location.coords.latitude,
        location.coords.longitude);
      var geoLocation = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      $scope.currentMarker.setPosition(myLocation); // update marker
      getOrders(geoLocation); // reload orders for current location
    }

    $scope.initMap = function(map) {
      $scope.map = map;
      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        template: 'Getting current location'
      });

      google.maps.event.addDomListener(map.locateMeControl, 'click',
        centerMyLocation);

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.currentLocation = pos;

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
        registerWatchLocation();
        $ionicLoading.hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
    };

    // register position watch event
    // !! only work on a real device !!
    function registerWatchLocation() {
      function success(pos) {
        $scope.currentLocation = pos;
        updateMyLocation(pos);
      }

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }

      // retrieve location every 10 seconds
      var options = {
        enableHighAccuracy: true
      };
      navigator.geolocation.watchPosition(success, error, options);
    }

    socket.on('connect', function() {
      console.log('connected');
    });

  });
