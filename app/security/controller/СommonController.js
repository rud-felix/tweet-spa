securityModule.controller('CommonController', [
    CommonController
]);

function CommonController() {
    //$controller('LogoutController', {$scope: $scope});

    var self = this;

    /**
     * @param {string} token
     * @return {boolean}
     */
    self.saveToken = function (token) {
        // TODO: add expires date
        if (localStorage.setItem('token', token)) {
            return true;
        }
        return false;
    };

    self.saveUserInfo = function (username, email) {
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
    };

    /**
     * @return {boolean}
     */
    self.isAuthed = function () {
        // TODO: check expires date
        if (localStorage.hasOwnProperty('token') && localStorage.getItem('token')) {
            return true;
        }
        return false;
    };
}