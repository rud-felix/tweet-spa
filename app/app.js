'use strict';

// API host
var host = 'http://twitter.local';

// if route not found then redirect to /login
appModule.config(['$routeProvider', '$locationProvider',
    function ($routeProvide, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide
            .otherwise({
                redirectTo: '/login'
            })
        ;
    }
]);

// simple redirect to login page if token not found in storage
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