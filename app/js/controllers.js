'use strict';

messageModule.controller('MessageController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.title = 'Messages';

    }
]);

userModule.controller('UserController', ['$scope', '$location', '$routeParams',
    function ($scope, $location, $routeParams) {
        $scope.title = 'Users';

    }
]);