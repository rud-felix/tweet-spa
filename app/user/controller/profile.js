'use strict';

userModule.controller('UserController', [
    '$scope', '$location', 'UserFactory',
    UserController
]);

function UserController($scope, UserFactory) {
    $scope.title = 'Profile';
    $scope.users = UserFactory.profile.query();
}

userModule.controller('ProfileController', [
    'UserFactory',
    ProfileController
]);

function ProfileController(UserFactory) {
    var self = this;

    self.title = 'Profile';

    self.context = {
        "username": localStorage.getItem('username'),
        "email": localStorage.getItem('email'),
        "password": self.password
    };

    self.updateProfile = function() {
        UserFactory.profile.save(self.context, function(response) {
            localStorage.setItem('username', response.username);
            localStorage.setItem('email', response.email);
            self.context.password = null;
        }, function() {
            self.context.password = null;
        });
    }
}