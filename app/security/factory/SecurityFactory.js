'use strict';

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