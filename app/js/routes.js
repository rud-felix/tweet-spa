'use strict';

messageModule.config(['$routeProvider', '$locationProvider',
    function($routeProvide, $locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide
            .when('/',{
                templateUrl:'/app/templates/home.html',
                controller:'MessageController'
            })
            .when('/search/message',{
                templateUrl:'/app/templates/message/search.html',
                controller:'MessageController'
            })
            .otherwise({
                redirectTo: '/'
            })
        ;
    }
]);

userModule.config(['$routeProvider', '$locationProvider',
    function($routeProvide, $locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide
            .when('/users',{
                templateUrl:'/app/templates/user/users.html',
                controller:'UserController'
            })
            .when('/users/:id',{
                templateUrl:'/app/templates/user/users.html',
                controller:'UserController'
            })
            .otherwise({
                redirectTo: '/'
            })
        ;
    }
]);