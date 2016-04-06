/**
 * Created by brice on 4/5/2016.
 */

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
  'use strict';

  angular
    .module('app.routes')
    .provider('RouteHelpers', RouteHelpersProvider);

  RouteHelpersProvider.$inject = []; //APP_REQUIRES
  function RouteHelpersProvider() {  //APP_REQUIRES

    return {
      basepath: basepath,
      $get: function() {
        return {
          basepath: basepath
        }
      }
    };

    // Return the base path for all app views
    function basepath(uri) {
      return 'app/views/' + uri;
    }
  }


})();

