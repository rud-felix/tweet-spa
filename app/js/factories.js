// TODO: move factory in to services.js
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


// TODO: move factory in to services.js
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
