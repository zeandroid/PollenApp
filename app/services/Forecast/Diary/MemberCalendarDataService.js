(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.service('MemberCalendarDataService', ['$http', '$q', function ($http, $q) {

        var entries = {};

        var createMonthData = function (data) {
            var month = {};
            $.each(data, function (index, value) {
                month[value.DDate] = value.SufferingScore;
            });
            return month;
        };

        return {

            getCalendarEntries: function (year, month) {
                var deferred = $q.defer();
                var monthYearKey = month + ' ' + year;

                if (entries[monthYearKey]) {
                    deferred.resolve(entries[monthYearKey]);
                } else {
                    var params = {
                        month: month,
                        year: year
                    };

                    $http.get(app.util.createWebApiUrl('diary/calendar/{month}/{year}', params)).then(function (response) {
                        var month = createMonthData(response.data);
                        entries[monthYearKey] = month;
                        deferred.resolve(month);
                    }, function (response) {
                        deferred.reject(response);
                    });
                }

                return deferred.promise;
            },

            addCalendarEntry: function (month, day, year, score) {
                entries[month + ' ' + year][day] = score;
            }
        };

    }]);

})();