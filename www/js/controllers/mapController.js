'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:MapController
 * @description
 * # MapController
 */
angular.module('MyApp')
  .controller('MapController', function($scope, $ionicLoading, socket,
    $localStorage, $ionicHistory) {

    $scope.markers = [];
    $scope.locations = $localStorage.getObject('mapLocations');
    $scope.infoWindow = new google.maps.InfoWindow({
      noSupress: true
    });

    // Adds a marker to the map and push to the array.
    $scope.addMarker = function(location) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          location.geoLocation.lat,
          location.geoLocation.lng
        ),
        map: $scope.map,
      });
      marker.addListener('click', function() {
        $scope.infoWindow.setContent(location.street + ', ' + location.postal);
        $scope.infoWindow.open($scope.map, marker);
      });
      marker.addListener('mousedown', function() {
        $scope.infoWindow.setContent(location.street + ', ' + location.postal);
        $scope.infoWindow.open($scope.map, marker);
      });
      $scope.markers.push(marker);

      return marker;
    };

    $scope.clearOverlays = function() {
      for (var i = 0; i < $scope.markers.length; i++) {
        $scope.markers[i].setMap(null);
      }
      $scope.markers.length = 0;
    };

    $scope.loadLocations = function() {
      if ($scope.locations.from && $scope.locations.to) {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap($scope.map);

        directionsService.route({
          origin: new google.maps.LatLng(
            $scope.locations.from.geoLocation.lat,
            $scope.locations.from.geoLocation.lng
          ),
          destination: new google.maps.LatLng(
            $scope.locations.to.geoLocation.lat,
            $scope.locations.to.geoLocation.lng
          ),
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      } else if ($scope.locations.from) {
        var marker = $scope.addMarker($scope.locations.from);
        $scope.map.setCenter(marker.position);
        $scope.map.setZoom(14);
      } else if ($scope.locations.to) {
        var marker = $scope.addMarker($scope.locations.to);
        $scope.map.setCenter(marker.position);
        $scope.map.setZoom(14);
      }
    };

    $scope.initMap = function(map) {
      $scope.map = map;
      if (!$scope.map) {
        return;
      }
      $scope.loadLocations();
    };
  });
