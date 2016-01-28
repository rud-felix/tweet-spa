'use strict';

userModule.controller('UserController', [
    '$scope', '$location', 'UserFactory',
    UserController
]);

function UserController(UserFactory) {
    var self = this;

    self.unfollowUser = function(id) {
        UserFactory.unfollow.save({ userId: id });
    };
}
