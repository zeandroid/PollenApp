(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.controller('AllergyOutlookController', ['$scope', 'AllergyOutlookService', function ($scope, AllergyOutlookService) {

        $scope.loading = false;
        $scope.outlook = null;

        // Outlook loading event
        $scope.$on('outlook.loading', function () {
            $scope.loading = true;
        });

        // Outlook done loading event
        $scope.$on('outlook.loadingComplete', function () {
            $scope.loading = false;
        });

        // Get the allergy outlook
        AllergyOutlookService.getAllergyOutlook().then(function (outlook) {
            $scope.outlook = outlook;
        });


        // Forecast URL property
        $scope.ForecastUrl = function () {
            return app.util.createUrl('forecast/current/pollen/' + $scope.outlook.ZIP);
        };

        // Format the season property to make more sense
        $scope.FormattedSeason = function () {
            return $scope.outlook.Season === 'None' ? 'No' : $scope.outlook.Season;
        }

    }]);

})();