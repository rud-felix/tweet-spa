'use strict';

// API host
var host = 'http://twitter.local';

// Main module
var appModule = angular.module("AppModule", ['MessageModule', 'UserModule', 'SecurityModule']);

appModule.run(function($location, $rootScope, $route) {
    $rootScope.$on('$locationChangeStart', function(evt, next, current) {
        var nextPath = $location.path(),
            nextRoute = $route.routes[nextPath];
        // TODO: use securityController.getToken()
        if (nextRoute && nextRoute.auth && !localStorage.getItem('token')) {
            $location.path("/login");
            return false;
        }
    });
});