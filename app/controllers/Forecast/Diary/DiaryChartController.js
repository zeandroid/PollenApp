(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.controller('DiaryChartController', ['$scope', '$rootScope', 'DiaryUrlService', 'MemberLocationService', 'DiaryChartDataService', function ($scope, $rootScope, DiaryUrlService, MemberLocationService, DiaryChartDataService) {

        var updateDiary = function (event, entry) {
            var date = moment(entry.DiaryDate).toDate().getTime();

            var diaryEntry = _.filter($scope.diary.data[0].data, function (data) { return data._originalDate.getTime() == date });
            if (diaryEntry) {
                diaryEntry[0].y = entry.SufferingScore;
            }
        };

        // Grab the zip code
        var zip = MemberLocationService.getMemberLocation();

        // Initialize diary scope
        $scope.diary = {};
        $scope.days = 30;
        $scope.getDiaryUrl = function (period) {
            return DiaryUrlService.createDiaryUrl(null, period);
        };

        // Check for the period url change
        $rootScope.$on('diary.periodChanged', function (event, period) {
            $scope.days = period;

            // Get the diary chart data
            DiaryChartDataService.getDiaryChartData($scope.days, zip).then(function (data) {
                $scope.diary = data;
            });
        })

        // Update chart scope when diary entry added
        $rootScope.$on('diary.entryAdded', updateDiary);

    }]);

})();