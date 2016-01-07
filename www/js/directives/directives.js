'use strict';

/**
 * @ngdoc function
 * @name MyApp.directive:map
 * @description
 * # Map Mirective
 */
angular.module('MyApp')
  .directive('map', function($compile) {
    return {
      restrict: 'E',
      scope: {
        onCreate: '&'
      },
      link: function($scope, $element, $attr) {
        $element.attr('data-tap-disabled', 'true');

        function initialize() {
          var mapOptions = {
            center: new google.maps.LatLng(1.352083, 103.819836),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
          };
          var map = new google.maps.Map($element[0], mapOptions);

          // Create a locate me button
          var centerControlDiv = document.createElement('div');
          var controlUI = document.createElement('button');
          controlUI.setAttribute('class',
            'button button-small button-icon icon ion-location'
          );
          controlUI.style.backgroundColor = '#fff';
          controlUI.style.textAlign = 'center';
          controlUI.style.marginRight = '10px';

          centerControlDiv.appendChild(controlUI);
          centerControlDiv.index = 1;
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
            centerControlDiv);
          map.locateMeControl = controlUI; // expose it for other to use

          $scope.onCreate({
            map: map
          });

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener($element[0], 'mousedown',
            function(e) {
              e.preventDefault();
              return false;
            });
        }

        if (document.readyState === 'complete') {
          initialize();
        } else {
          google.maps.event.addDomListener(window, 'load', initialize);
        }
      }
    };
  });
