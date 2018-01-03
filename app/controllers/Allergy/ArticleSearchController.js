(function () {

    'use strict';

    var research = angular.module('allergy');

    research.controller('ArticleSearchController', ['$scope', 'AllergyDataService', 'article', function ($scope, AllergyDataService, article) {

        $scope.article = null;

        $scope.getArticles = function (query) {
            return AllergyDataService.searchArticles(query, article.articleType.toLowerCase());
        };

        $scope.onArticleSelect = function (item, model, label) {
            window.location = app.util.createUrl('allergy/news/{hdid}', { hdid: item.HDID });
        };

    }]);
})();