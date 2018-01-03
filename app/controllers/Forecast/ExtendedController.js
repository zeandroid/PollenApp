(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.controller('ExtendedController', ['$scope', 'ForecastDataService', 'pageData', function ($scope, ForecastDataService, pageData) {

        $scope.extended = {};

        var extended = ForecastDataService.getExtended(pageData.dataType, pageData.zip, pageData.zip2).then(function (extended) {
            $scope.extended = extended;
        });

    }]);
})();