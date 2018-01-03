(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.service('LocationSearchService', ['$http', function ($http) {

        return {

            searchLocations: function (query) {
                return $http.get(app.util.createWebApiUrl('LocationSearch?q=' + query))
                .then(function (response) {
                    return response.data.Locations;
                });
            }
        };

    }]);
})()