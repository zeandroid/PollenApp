(function () {

    'use strict';

    angular.module('allergy').service('AllergyDataService', ['$http', function ($http) {

        return {
            searchArticles: function (query, articleType) {
                var param = {
                    query: query,
                    articleType: articleType
                };

                return $http.get(app.util.createWebApiUrl('articles/search/{articleType}?topic={query}', param))
                .then(function (response) {
                    return response.data;
                });
            }
        };

    }]);

})();