'use strict';

// Message controller
messageModule.controller('MessageController', [
    '$scope',
    '$location',
    'MessagesFactory',
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
        };

        // TODO: refactoring
        if ($location.path() == '/') {
            $scope.title = 'Followers messages';
            $scope.messages = MessagesFactory.userMessages.query(); // TODO: replace on followersMessages
        }
        if ($location.path() == '/search/message') {
            $scope.title = 'Search messages';
            $scope.messages = MessagesFactory.searchMessages.query();
        }
    }
]);

// TODO: move factory in to services.js
messageModule.factory('MessagesFactory', ['$resource',
    function ($resource) {
        return {
            userMessages: $resource(host + '/api/v1/messages/users/:userId/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        userId: 1,
                        page: 1
                    },
                    isArray: false
                }
            }),
            followersMessages: $resource(host + '/api/v1/messages/followers/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1
                    },
                    isArray: false
                }
            }),
            searchMessages: $resource(host + '/api/v1/messages/search/pages/:page/:text', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1,
                        text: 'test'
                    },
                    isArray: false
                }
            }),
            addMessages: $resource(host + '/api/v1/messages', {}, {
                save: {
                    method: 'POST',
                    params: {},
                    isArray: false
                }
            })
        };
    }]
);

// User controller
userModule.controller('UserController', ['$scope', '$location', '$routeParams',
    function ($scope, $location, $routeParams, Userfactory) {
        $scope.title = 'User';

    }
]);

// TODO: move factory in to services.js
userModule.factory('UserFactory', ['$resource',
    function ($resource) {
        return {
            users: $resource(host + '/api/v1/users/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1
                    },
                    isArray: false
                }
            }),
            followers: $resource(host + '/api/v1/users/followers/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        page: 1
                    },
                    isArray: false
                }
            }),
            follow: $resource(host + '/api/v1/users/:id/follow', {}, {
                save: {
                    method: 'POST',
                    params: {
                        id: 1
                    },
                    isArray: false
                }
            }),
            unfollow: $resource(host + '/api/v1/users/:id/unfollow', {}, {
                save: {
                    method: 'PUT',
                    params: {
                        id: 1
                    },
                    isArray: false
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
            'password': null
        };

        /**
         * @return {null|string}
         */
        self.getToken = function () {
            return localStorage.getItem('token');
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

        self.login = function () {
            self.credential.username = self.username;
            self.credential.password = self.password;

            SecurityFactory.login.query(self.credential, function (response) {
                self.saveToken(response.apiKey);
                $location.path('/');
            });
        };

        /**
         * @returns {boolean}
         */
        self.logout = function () {
            if (localStorage.removeItem('token')) {
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
securityModule.factory('SecurityFactory', ['$resource',
    function ($resource) {
        return {
            login: $resource(host + '/api/v1/login', {}, {
                query: {
                    method: 'POST',
                    params: {},
                    isArray: false
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

//securityModule.factory('AuthFilter', ['SecurityController',
//    function ($location, securityController) {
//        return function () {
//            if (!securityController.isAuthed()) {
//                $location.path('/login');
//                return false;
//            }
//            return true;
//        };
//    }
//]);