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