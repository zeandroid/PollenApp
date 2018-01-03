(function () {

    'use strict';

    angular.module('forecast').service('DiaryUrlService', ['$location', '$rootScope', function ($location, $rootScope) {
        var service = {
            getDiaryDate: getDiaryDate,
            getDiaryPeriod: getDiaryPeriod,
            createDiaryUrl: createDiaryUrl
        };

        $rootScope.$watch(function () { return $location.path(); }, function () {
            var date = service.getDiaryDate();
            $rootScope.$broadcast('diary.dateChanged', date);
        });

        $rootScope.$watch(function () { return $location.search().period; }, function () {
            var period = service.getDiaryPeriod();
            $rootScope.$broadcast('diary.periodChanged', period);
        });

        return service;

        function getDiaryDate () {
            var path = $location.path().replace('/', '');
            var date = new Date();

            if (path) {
                date = new Date(path);
            }

            return date;
        };

        function getDiaryPeriod () {
            var period = $location.search().period;
            var days = 30;

            if (period === '1-month') { days = 30; }
            else if (period === '3-month') { days = 90; }
            else if (period === '6-month') { days = 180 }
            else if (period === 'ytd') { days = moment().dayOfYear(); }

            return days;
        };

        function createDiaryUrl(diaryDate, diaryPeriod) {
            var diaryUrl = 'forecast/diary#/';
            var url = app.util.createUrl(diaryUrl);
            var fullDiaryUrl = url;

            if (diaryDate) {
                url += _createDiaryDateUrl(diaryDate);
            } else if ($location.path()) {
                url += _createDiaryDateUrl(getDiaryDate());
            }

            if (diaryPeriod) {
                url += _createPeriodUrl(diaryPeriod);
            } else if ($location.search().period) {
                url += _createPeriodUrl($location.search().period);
            }
            
            //if (url === fullDiaryUrl) {
            //    url = url.replace('#/', ''); // If nothing changed remove #/
            //}

            return url;
        };

        function _createDiaryDateUrl(date) {
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            var url = month + '/' + day + '/' + year;
            return url;
        }

        function _createPeriodUrl(period) {
            var url = '?period=' + period;
            return url;
        }

    }]);

})();