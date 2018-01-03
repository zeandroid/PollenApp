(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.controller('CityCompareController', ['$scope', 'LocationSearchService', function ($scope, LocationSearchService) {

        $scope.location1 = null;
        $scope.location2 = null;

        $scope.getLocations = function (query) {
            return LocationSearchService.searchLocations(query);
        };

        $scope.compare = function () {

            if ($scope.location1 && $scope.location2) {
                var params = {
                    zip1: $scope.location1.id,
                    zip2: $scope.location2.id
                };
                var url = app.util.createUrl('forecast/extended/pollen/{zip1}/{zip2}', params);

                window.location = url;
            }
        };

    }]);

})();