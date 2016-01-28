'use strict';

userModule.controller('UserController', [
    '$scope', '$location', 'UserFactory',
    UserController
]);

function UserController($scope, UserFactory) {
    $scope.title = 'User followers';
    $scope.users = UserFactory.followers.query();
}
