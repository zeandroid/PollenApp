(function () {

    'use strict';

    var research = angular.module('research');

    research.controller('PlantSearchController', ['$scope', 'ResearchDataService', function ($scope, ResearchDataService) {

        $scope.plant = null;

        $scope.getPlants = function (query) {
            return ResearchDataService.searchPlants(query);
        };

        $scope.onPlantSelect = function (item, model, label) {
            window.location = app.util.createUrl('research/genus/{plant}', { plant: item.id });
        };

    }]);
})();