'use strict';

messageModule.factory('MessagesFactory', ['$resource', 'securityProvider',
    function ($resource, securityProvider) {
        return {
            userMessages: $resource(host + '/api/v1/messages/users/:userId/pages/:page', {}, {
                query: {
                    method: 'GET',
                    params: {
                        userId: '@userId',
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