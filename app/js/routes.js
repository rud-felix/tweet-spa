'use strict';

messageModule.config(['$routeProvider', '$locationProvider',
    function($routeProvide, $locationProvider){
        $routeProvide
            .when('/',{
                templateUrl:'/app/templates/home.html',
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