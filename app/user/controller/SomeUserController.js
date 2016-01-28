'use strict';

userModule.controller('SomeUserController', [
    '$scope', 'UserFactory', 'MessagesFactory',
    SomeUserController
]);

function SomeUserController($scope, UserFactory, MessagesFactory) {
    var userId = $scope.userId;

    console.log(userId);

    if (userId) {
        $scope.user = UserFactory.user.query({userId: userId});
        $scope.messages = MessagesFactory.userMessages.query({userId: userId});
        return true;
    }
    return false;
}






