'use strict';

messageModule.config(['$routeProvider', '$locationProvider',
    function ($routeProvide, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide
            .when('/', {
                templateUrl: '/app/home/templates/home.html',
                controller: 'MessageController',
                auth: true
            })
            .when('/search/message', {
                templateUrl: '/app/message/templates/search.html',
                controller: 'MessageController',
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
                templateUrl: '/app/user/templates/users.html',
                controller: 'UserController',
                auth: true
            })
            .when('/user/:id', {
                templateUrl: '/app/user/templates/user.html',
                controller: 'SomeUserController',
                auth: true
            })
            .when('/users/followers', {
                templateUrl: '/app/user/templates/followers.html',
                controller: 'UserController',
                auth: true
            })
            .when('/profile', {
                templateUrl: '/app/user/templates/profile.html',
                controller: 'ProfileController',
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
                templateUrl: '/app/security/templates/login.html',
                controller: 'LoginController'
            })
            .when('/registration', {
                templateUrl: '/app/security/templates/registration.html',
                controller: 'RegistrationController'
            })
            .when('/logout', {
                controller: 'LogoutController',
                auth: true
            })
        ;
    }
]);