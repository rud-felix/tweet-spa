'use strict';

userModule.factory('UserFactory', ['$resource', 'securityProvider',
    function ($resource, securityProvider) {
        return {
            user: $resource(host + '/api/v1/users/:userId', {}, {
                query: {
                    method: 'GET',
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
                save: {
                    method: 'POST',
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