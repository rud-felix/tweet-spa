'use strict';

securityModule.controller('LogoutController', [
    '$location',
    LogoutController
]);

function LogoutController($location) {
    /**
     * @returns {boolean}
     */
    self.logout = function () {
        if (localStorage.removeItem('token')) {
            localStorage.removeItem('username');
            localStorage.removeItem('email');

            $location.path('/login');
            return true;
        }
        return false;
    };
}