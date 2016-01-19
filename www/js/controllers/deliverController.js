'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:DeliverController
 * @description
 * # DeliverController
 */
angular.module('MyApp')
  .controller('DeliverController', function($scope, $ionicLoading, socket,
    OrderService, $compile, $ionicPopup, $state) {

    $scope.markers = [];
    $scope.orders = [];
    $scope.currentMarker = null;
    $scope.currentLocation = null;

    // Shared info window
    $scope.infoWindow = new google.maps.InfoWindow({
      content: 'This will show order info.',
      noSupress: true
    });

    function generateInoWindowContent(orderData) {
      var fromAddress = orderData.fromAddress;
      var toAddress = orderData.toAddress;
      var type = orderData.orderType;
      if (type === 0) {
        type = 'Document';
      } else if (type === 1) {
        type = 'Small Parcel';
      } else if (type === 2) {
        type = 'Medium Parcel';
      } else if (type === 3) {
        type = 'Large Parcel';
      }
      return '<div id="info-main">' +
        '<p id="parcel-type">' + type + '</p>' +
        '<p><h5>From:</h5>' + fromAddress.extra + ', ' +
        fromAddress.street +
        ', ' + fromAddress.postal + '</p>' +
        '<p><h5>From:</h5>' + toAddress.extra + ', ' + toAddress.street +
        ', ' + toAddress.postal + '</p>' +
        '<div><button class="button button-block button-positive" ' +
        'ng-click="deliverOrder(\'' + orderData.order_number +
        '\')">Deliver</button>' +
        '</div>';
    }

    // Adds a marker to the map and push to the array.
    function addMarker(entry, type) {
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

      var marker;
      if (type !== 'me') { // orders marker
        var location = new google.maps.LatLng(
          entry.location.coordinates[1],
          entry.location.coordinates[0]
        );
        marker = new google.maps.Marker({
          position: location,
          map: $scope.map,
          icon: iconUsed,
          data: entry
        });

        var infoWindowElement = generateInoWindowContent(marker.data);
        var compiled = $compile(infoWindowElement)($scope);

        marker.addListener('click', function() {
          $scope.infoWindow.setContent(compiled[0]);
          $scope.infoWindow.open($scope.map, marker);
        });
        marker.addListener('mousedown', function() {
          $scope.infoWindow.setContent(compiled[0]);
          $scope.infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
      } else {
        marker = new google.maps.Marker({
          position: entry,
          map: $scope.map,
          icon: iconUsed
        });
        $scope.currentMarker = marker; // update current marker
      }
    }

    function getOrders(location) {
      OrderService.getOrders(location)
        .success(function(data) {
          $scope.markers = []; // clear cached markers
          $scope.orders = data; // reset orders data on map
          data.forEach(function(entry) {
            addMarker(entry);
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

    $scope.deliverOrder = function(orderId) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Start Deliver Order',
        template: 'Are you sure you want to deliver this order?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $state.go('app.confirmOrder', {
            orderId: orderId
          });
        }
      });

    };

    // register position watch event
    // !! only work on a real device !!
    function registerWatchLocation() {
      // may need to send location to the server
      function success(pos) {
        $scope.currentLocation = pos;
        updateMyLocation(pos);
      }

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }

      // retrieve location every 10 seconds
      var options = {
        enableHighAccuracy: false
      };
      navigator.geolocation.watchPosition(success, error, options);
    }

    socket.on('connect', function() {
      console.log('connected');
    });

  });
