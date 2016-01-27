'use strict';

// Message controller
messageModule.controller('messageController', ['$scope', '$location', 'MessagesFactory',
    function ($scope, $location, MessagesFactory) {
        var self = this;

        self.context = {
            'text': null
        };

        self.add = function () {
            self.context.text = self.text;

            $scope.messages = MessagesFactory.addMessages.save(self.context, function () {
                self.text = '';
            });

            // TODO: view old + new messages
            //$scope.messages = MessagesFactory.followersMessages.query();
        };

        self.search = function() {
            self.context.text = self.text;

            $scope.messages = MessagesFactory.searchMessages.query(self.context, function () {
                self.text = '';
            });
        };

        // TODO: refactoring
        if ($location.path() == '/') {
            $scope.title = 'Followers messages';
            $scope.messages = MessagesFactory.followersMessages.query();
        }
        if ($location.path() == '/search/message') {
            $scope.title = 'Search messages';
            $scope.messages = MessagesFactory.searchMessages.query();
        }
    }
]);

// User controller
userModule.controller('userController', ['$scope', '$location', 'UserFactory',
    function ($scope, $location, UserFactory) {
        var self = this;
        var userId = $scope.userId;

        console.log(userId);

        self.followUser = function(id) {
            UserFactory.follow.save({ userId: id });
        };

        self.unfollowUser = function(id) {
            UserFactory.unfollow.save({ userId: id });
        };

        if ($location.path() == '/users/followers') {
            $scope.title = 'User followers';
            $scope.users = UserFactory.followers.query();
        }
        if ($location.path() == '/users') {
            $scope.title = 'Users';
            $scope.users = UserFactory.users.query();
        }
        if ($location.path() == '/profile') {
            $scope.title = 'Profile';
            $scope.users = UserFactory.profile.query();
        }
    }
]);

userModule.controller('someUserController', ['$scope', '$location', 'UserFactory', 'MessagesFactory',
    function ($scope, $location, UserFactory, MessagesFactory) {
        var userId = $scope.userId;

        console.log(userId);

        if (userId) {
            $scope.user = UserFactory.user.query({userId: userId});
            $scope.messages = MessagesFactory.userMessages.query({userId: userId});
            return true;
        }
        return false;
    }
]);


userModule.controller('profileController', ['$scope', '$location', 'UserFactory',
    function ($scope, $location, UserFactory) {
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
]);

// Security controller
securityModule.controller('securityController', [
    '$scope',
    '$location',
    '$routeParams',
    'SecurityFactory',
    function ($scope, $location, $routeParams, SecurityFactory) {
        var self = this;

        self.credential = {
            'username': null,
            'password': null,
            'email': null
        };

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

        self.login = function () {
            self.credential.username = self.username;
            self.credential.password = self.password;

            SecurityFactory.request_login.query(self.credential, function (response) {
                self.saveToken(response.apiKey);
                self.saveUserInfo(response.username, response.email);
                $location.path('/');
            });
        };

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
]);

securityModule.provider('securityProvider',
    function () {
        this.$get = function () {
            return {
                /**
                 * @return {null|string}
                 */
                getToken: function () {
                    return localStorage.getItem('token');
                }
            }
        }
    }
);