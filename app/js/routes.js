'use strict';

messageModule.config(['$routeProvider', '$locationProvider',
    function ($routeProvide, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide
            .when('/', {
                templateUrl: '/app/templates/home.html',
                controller: 'messageController',
                auth: true
            })
            .when('/search/message', {
                templateUrl: '/app/templates/message/search.html',
                controller: 'messageController',
                auth: true
            })
            //.otherwise({
            //    redirectTo: '/login'
            //})
        ;
    }
]);

userModule.config(['$routeProvider', '$locationProvider',
    function ($routeProvide, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide
            .when('/users', {
                templateUrl: '/app/templates/user/users.html',
                controller: 'userController',
                auth: true
            })
            .when('/user/:id', {
                templateUrl: '/app/templates/user/user.html',
                controller: 'someUserController',
                auth: true
            })
            .when('/users/followers', {
                templateUrl: '/app/templates/user/followers.html',
                controller: 'userController',
                auth: true
            })
            .when('/profile', {
                templateUrl: '/app/templates/user/profile.html',
                controller: 'profileController',
                auth: true
            })
        ;
    }
]);

securityModule.config(['$routeProvider', '$locationProvider',
    function ($routeProvide, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide
            .when('/login', {
                templateUrl: '/app/templates/security/login.html',
                controller: 'securityController'
            })
            .when('/registration', {
                templateUrl: '/app/templates/security/registration.html',
                controller: 'securityController'
            })
            .when('/logout', {
                controller: 'securityController',
                auth: true
            })
        ;
    }
]);