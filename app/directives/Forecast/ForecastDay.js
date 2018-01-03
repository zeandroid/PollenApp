(function () {

    'use strict';

    var forecast = new angular.module('forecast');

    forecast.directive('forecastDay', function () {
        return {
            restrict: 'C',
            templateUrl: '/forecast/day.html',
            scope: {
                day: '='
            }
        };
    });

})();