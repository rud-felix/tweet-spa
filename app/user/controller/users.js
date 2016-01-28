'use strict';

userModule.controller('UserController', [
    '$scope', '$location', 'UserFactory',
    UserController
]);

function UserController($scope, UserFactory) {
    $scope.title = 'Users';
    $scope.users = UserFactory.users.query();
}