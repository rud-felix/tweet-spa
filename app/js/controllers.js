'use strict';

// Message controller
messageModule.controller('MessageController', ['$scope', '$location', 'MessagesFactory',
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
            //$scope.messages = MessagesFactory.searchMessages.query();
        }
        console.log($scope.messages);
    }
]);

// User controller
userModule.controller('UserController', ['$scope', '$location', 'UserFactory',
    function ($scope, $location, UserFactory) {
        var self = this;

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

userModule.controller('profileController', ['$scope', '$location', 'UserFactory',
    function ($scope, $location, UserFactory) {
        var self = this;

        $scope.email = localStorage.getItem('email');
        $scope.username = localStorage.getItem('username');

        $scope.title = 'Profile';
        $scope.users = UserFactory.profile.query();
    }
]);

// TODO: move factory in to services.js
messageModule.factory('MessagesFactory', ['$resource', 'securityProvider',
    function ($resource, securityProvider) {
        return {
            userMessages: $resource(host + '/api/v1/messages/users/:userId/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        userId: 1,
                        page: 1
                    },
                    isArray: false,
                    headers: { // TODO: move headers in some variable
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
            followersMessages: $resource(host + '/api/v1/messages/followers/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1
                    },
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
            searchMessages: $resource(host + '/api/v1/messages/search/pages/:page/:text', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1,
                        text: 'test'
                    },
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
            addMessages: $resource(host + '/api/v1/messages', {}, {
                save: {
                    method: 'POST',
                    params: {},
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            })
        };
    }]
);

// Security controller
securityModule.controller('SecurityController', [
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

// TODO: move factory in to services.js
userModule.factory('UserFactory', ['$resource', 'securityProvider',
    function ($resource, securityProvider) {
        return {
            users: $resource(host + '/api/v1/users/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1
                    },
                    cache: false,
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
            followers: $resource(host + '/api/v1/users/followers/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1
                    },
                    cache: false,
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
            follow: $resource(host + '/api/v1/users/:userId/follow', {}, {
                save: {
                    method: 'POST',
                    params: {
                        userId: '@userId'
                    },
                    cache: false,
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
            unfollow: $resource(host + '/api/v1/users/:userId/unfollow', {}, {
                save: {
                    method: 'POST',
                    params: {
                        userId: '@userId'
                    },
                    cache: false,
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
            profile: $resource(host + '/api/v1/users/profile', {}, {
                query: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': securityProvider.getToken()
                    }
                }
            }),
        };
    }]
);

// TODO: move factory in to services.js
securityModule.factory('SecurityFactory', ['$resource',
    function ($resource) {
        return {
            request_login: $resource(host + '/api/v1/login', {}, {
                query: {
                    method: 'POST',
                    params: {},
                    isArray: false,
                    cache: false
                }
            }),
            logout: $resource(host + '/api/v1/logout', {}, {
                query: {
                    method: 'GET',
                    params: {},
                    isArray: false
                }
            }),
            registration: $resource(host + '/api/v1/registration', {}, {
                save: {
                    method: 'POST',
                    params: {},
                    isArray: false
                }
            })
        };
    }]
);

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