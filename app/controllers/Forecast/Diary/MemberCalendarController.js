(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.controller('MemberCalendarController', ['$scope', '$rootScope', 'DiaryUrlService', function ($scope, $rootScope, DiaryUrlService) {

        var setCalendarDateScope = function (date) {
            $scope.date = {
                month: date.getMonth() + 1,
                day: date.getDate(),
                year: date.getFullYear()
            };

        };

        var date = DiaryUrlService.getDiaryDate();
        setCalendarDateScope(date);

        $rootScope.$on('diary.dateChanged', function (event, date) { setCalendarDateScope(date); });
    }]);

})();