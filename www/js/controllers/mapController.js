'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:MapController
 * @description
 * # MapController
 */
angular.module('MyApp')
  .controller('MapController', function($scope, $ionicLoading, socket,
    $sessionStorage) {
    var markers = [];

    $scope.userid = $sessionStorage.get('userid', null);

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: $scope.map
      });

      // Add info window
      var infoWindow = new google.maps.InfoWindow({
        content: 'This is a new marker',
        noSupress: true
      });

      marker.addListener('click', function() {
        infoWindow.open($scope.map, marker);
      });
      markers.push(marker);
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
        $scope.map.setZoom(14);

        addMarker(myLocation);

        var LatLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        sendLocation('init', LatLng);

        $ionicLoading.hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
    };

    // Socket
    function sendLocation(eventName, location) {
      socket.emit(eventName, {
        id: $scope.userid,
        location: location
      });
    }

    socket.on('connect', function() {
      console.log('connected');
    });

    socket.on('syncCord', function(data) {
      console.log('New message received: ' + data);
    });
  });
