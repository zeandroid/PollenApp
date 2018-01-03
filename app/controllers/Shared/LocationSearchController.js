(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.controller('LocationSearchController', ['$scope', 'LocationSearchService', 'LocationService', function ($scope, LocationSearchService, LocationService) {
        $scope.location = null;

        var goToForecast = function (location) {
            var zip = location.id;
            LocationService.setCurrentLocation(zip);
            window.location = app.util.createUrl('forecast/current/pollen/' + zip);
        };

        $scope.getLocations = function (query) {
            return LocationSearchService.searchLocations(query);
        };

        $scope.onLocationSelect = function (location, model, label) {
            goToForecast(location);
        };

        $scope.verifyLocation = function () {
            var locations = LocationSearchService.searchLocations($scope.location).then(function (locations) {
                if (locations.length > 0) {
                    goToForecast(locations[0]);
                }
            });
        };
    }]);

})();