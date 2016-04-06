/**
 * Created by brice on 4/5/2016.
 */

(function() {
  'use strict';

  angular
    .module('app.routes')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

    $locationProvider.html5Mode(false);

    // defaults to overview
    $urlRouterProvider.otherwise('/app/earth');

    //
    // Routes
    //
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html')
      })
      .state('app.earth', {
        url: '/earth',
        title: 'Earth',
        templateUrl: helper.basepath('earth.html')
      })
      .state('app.class_details', {
        url: '/classes/:id',
        title: 'Class Details',
        templateUrl: helper.basepath('details.html')
      })
    ;

  }

})();

