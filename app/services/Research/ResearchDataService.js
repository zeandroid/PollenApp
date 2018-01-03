(function () {

    'use strict';

    angular.module('research').service('ResearchDataService', ['$http', function ($http) {

        return {
            searchPlants: function (query) {
                return $http.get(app.util.createWebApiUrl('research/search/' + query))
                .then(function (response) {
                    return response.data.plants;
                });
            }
        };

    }]);

})();