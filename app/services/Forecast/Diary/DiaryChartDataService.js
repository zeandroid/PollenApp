(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.service('DiaryChartDataService', ['$http', '$q', function ($http, $q) {

        var createDiaryChartData = function (date, data) {
            var dateMoment = moment(date);

            return {
                name: dateMoment.format('MM/DD'),
                y: data,
                _originalDate: dateMoment.toDate()
            };
        };

        return {

            getDiaryChartData: function (days, zip) {

                return $q.all([
                    $http.get(app.util.createWebApiUrl('diary/history/' + days)),
                    $http.get(app.util.createWebApiUrl('forecast/historic/pollen/' + zip + '/' + days))
                ]).then(function (results) {

                    var diaryHistory = results[0].data;
                    var forecastHistory = results[1].data;

                    var chart = {};
                    var diaryChart = [];
                    var forecastChart = [];

                    // Populate the diary chart data
                    _.each(diaryHistory, function (period, key) {
                        diaryChart.push(createDiaryChartData(period.DiaryDate, period.SScore));
                    });

                    // Populate the forecast chart data
                    _.each(forecastHistory.Location.periods, function (period, key) {
                        forecastChart.push(createDiaryChartData(period.Period, period.Index));
                    });

                    chart.data = [
                        { name: 'My Diary', data: diaryChart, yAxis: 0, dataLabels: { enabled: false } },
                        { name: 'Pollen Index', data: forecastChart, yAxis: 1, color: '#7bb400', dataLabels: { enabled: false } }
                    ];

                    return chart;

                });

            }
        };

    }]);

})();