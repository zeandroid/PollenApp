(function () {

    'use strict';

    angular
        .module('pollen').factory('Unauthorized', ['$q', function ($q) {

            return {
                responseError: function (response) {

                    if (response.status === 401) {
                        window.location = app.util.createUrl('accounts/mylogin');
                        return;
                    }

                    return $q.reject(response)
                }
            };

        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('Unauthorized');
        }]);
})();