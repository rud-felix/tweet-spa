'use strict';

securityModule.controller('RegistrationController', [
    '$location',
    RegistrationController
]);

function RegistrationController($location) {
    self.registration = function () {
        self.credential.username = self.username;
        self.credential.password = self.password;
        self.credential.email = self.email;

        SecurityFactory.registration.save(self.credential, function (response) {
            self.saveToken(response.apiKey);
            self.saveUserInfo(response.username, response.email);
            $location.path('/');
        });
    };
}