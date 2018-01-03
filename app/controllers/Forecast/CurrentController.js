(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.controller('CurrentController', ['$scope', 'ForecastDataService', 'pageData', function ($scope, ForecastDataService, pageData) {

        $scope.days = [];

        // Get the current forecast data
        ForecastDataService.getCurrent(pageData.dataType, pageData.zip).then(function (days) {

            $scope.days = days;

            // Add make visible function for all days
            _.each($scope.days, function (day, key) {
                $scope.days[key].makeVisible = function () {
                    // Untoggle all days
                    _.each($scope.days, function (day) {
                        day.isVisible = false;
                    });
                    day.isVisible = true;
                };
            });

        });

    }]);

})();