(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.controller('AnnualController', ['$scope', 'ForecastDataService', 'pageData', function ($scope, ForecastDataService, pageData) {

        $scope.annual = {};

        ForecastDataService.getAnnual(pageData.dataType, pageData.zip).then(function (annual) {
            $scope.annual = annual;
        });

    }]);

})();