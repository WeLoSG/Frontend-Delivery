angular.module('MyApp')

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
  // register $http interceptors, if any. e.g.
  // $httpProvider.interceptors.push('interceptor-name');

  // Application routing
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .state('app.home', {
      url: '/home',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('app.deliver', {
      url: '/deliver',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/deliver.html',
          controller: 'DeliverController'
        }
      }
    })
    .state('app.confirmOrder', {
      url: '/confirmOrder/:orderId',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/confirmOrder.html',
          controller: 'ConfirmOrderController'
        }
      }
    })
    .state('app.account', {
      url: '/account',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/account.html',
          controller: 'AccountController'
        }
      }
    })
    .state('app.tasks', {
      url: '/tasks',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/tasks.html',
          controller: 'TasksController'
        }
      }
    });

  // redirects to default route for undefined routes
  $urlRouterProvider.otherwise('/app/home');
});
