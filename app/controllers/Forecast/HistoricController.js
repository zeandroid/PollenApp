(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.controller('HistoricController', ['$scope', 'ForecastDataService', 'pageData', 'history', function ($scope, ForecastDataService, pageData, history) {

        $scope.historic = {};

        var historic = ForecastDataService.getHistoric(pageData.dataType, pageData.zip, history.days).then(function (historic) {
            $scope.historic = historic;
        });

    }]);

})()