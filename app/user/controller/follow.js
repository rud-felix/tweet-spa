'use strict';

userModule.controller('UserController', [
    '$scope', '$location', 'UserFactory',
    UserController
]);

function UserController(UserFactory) {
    var self = this;

    self.followUser = function(id) {
        UserFactory.follow.save({ userId: id });
    };
}
