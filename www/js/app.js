/**
 * @ngdoc overview
 * @name MyApp
 * @description
 * # Initializes main application
 *
 * Main module of the application.
 */

angular.module('MyApp', ['ionic', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }
  });

  // Supress google map's infowindow
  function fixInfoWindow() {
    var set = google.maps.InfoWindow.prototype.set;
    google.maps.InfoWindow.prototype.set = function(key, val) {
      if (key === 'map') {
        if (!this.get('noSupress')) {
          return;
        }
      }
      set.apply(this, arguments);
    };
  }

  fixInfoWindow();
});
