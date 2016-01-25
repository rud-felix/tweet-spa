'use strict';

// Message controller
messageModule.controller('MessageController', [
    '$scope',
    '$location',
    'MessagesFactory',
    function ($scope, $location, MessagesFactory) {
        var message = this;

        message.context = {
            'text': null
        };

        message.add = function() {
            message.context.text = message.text;

            $scope.messages = MessagesFactory.addMessages.save(message.context, function() {
                message.text = '';
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
    function($resource){
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
    function ($scope, $location, $routeParams, UserMessages) {
        $scope.title = 'User';

    }
]);

// TODO: move factory in to services.js
userModule.factory('UserFactory', ['$resource',
    function($resource){
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
securityModule.controller('SecurityController', ['$scope', '$location', '$routeParams',
    function ($scope, $location, $routeParams, UserMessages) {

    }
]);

// TODO: move factory in to services.js
securityModule.factory('SecurityFactory', ['$resource',
    function($resource){
        return {
            login: $resource(host + '/api/v1/login', {}, {
                query: {
                    method: 'GET',
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