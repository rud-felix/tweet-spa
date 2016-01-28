'use strict';

securityModule.controller('LoginController', [
    '$scope', '$location', 'SecurityFactory',
    LoginController
]);

function LoginController($scope, $location, SecurityFactory) {
    var self = this;

    self.credential = {
        'username': null,
        'password': null
    };

    self.login = function () {
        self.credential.username = self.username;
        self.credential.password = self.password;

        SecurityFactory.request_login.query(self.credential, function (response) {
            self.saveToken(response.apiKey);
            self.saveUserInfo(response.username, response.email);
            $location.path('/');
        });
    };
}