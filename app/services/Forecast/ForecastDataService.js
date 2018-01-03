(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.service('ForecastDataService', ['$filter', 'ForecastIndexService', '$q', '$http', function ($filter, ForecastIndexService, $q, $http) {

        return {

            // current view
            getCurrent: function (dataType, zip) {
                var deferred = $q.defer();

                $http.get(app.util.createWebApiUrl('forecast/current/' + dataType + '/' + zip)).then(function (result) {
                    var forecastModel = result.data;
                    var days = [];

                    _.each(forecastModel.Location.periods, function (period, i) {
                        // Grab the period index range/labels
                        _.extend(period, ForecastIndexService.getIndexRange(period.Index));

                        // Grab the index percentages for the donut chart
                        _.extend(period, ForecastIndexService.getForecastIndexPercentages(period.Index));

                        // Initialize the top allergen panel visibility
                        period.isVisible = false;

                        days.push(period);
                    });

                    // Make the today's allergen panel visible
                    var today = _.findWhere(days, { Type: 'Today' });
                    today.isVisible = true;

                    deferred.resolve(days);
                });

                return deferred.promise;
            },

            // 5 day forecast
            getExtended: function (dataType, zip, zip2) {
                var deferred = $q.defer();

                var chart = {};
                chart.data = [];

                var extendedRequests = [
                    $http.get(app.util.createWebApiUrl('forecast/extended/' + dataType + '/' + zip))
                ];

                if (zip2) {
                    extendedRequests.push($http.get(app.util.createWebApiUrl('forecast/extended/' + dataType + '/' + zip2)));
                }

                $q.all(extendedRequests).then(function (result) {
                    _.each(result, function (r, key) {
                        var forecastModel = r.data;
                        var extended = [];

                        // Populate the chart data
                        _.each(forecastModel.Location.periods, function (period, key) {

                            // Add the chart data
                            var indexRange = ForecastIndexService.getIndexRange(period.Index);
                            var date = moment(period.Period)

                            var extendedChart = {
                                name: date.format('dddd'),
                                y: period.Index
                            };

                            // Only set color if there is one data set
                            if (result.length === 1) {
                                extendedChart.color = indexRange.color;
                            }                           

                            extended.push(extendedChart);

                        });

                        chart.data.push({ data: extended, name: forecastModel.Location.City + ', ' + forecastModel.Location.State });
                    });

                    if (result.length === 2) {
                        chart.data[0].color = "#7bb400";
                        chart.data[1].color = "#777777";                        
                    }

                    deferred.resolve(chart);

                });

                return deferred.promise;
            },

            // historic view
            getHistoric: function (dataType, zip, days) {
                var deferred = $q.defer();

                var params = {
                    dataType: dataType,
                    zip: zip,
                    days: days
                };

                $http.get(app.util.createWebApiUrl('forecast/historic/{dataType}/{zip}/{days}', params)).then(function (result) {
                    var forecastModel = result.data;
                    var chart = {};

                    chart.data = [];
                    chart.categories = [];

                    // Populate the chart data
                    _.each(forecastModel.Location.periods, function (period, key) {

                        // Add the chart data
                        var indexRange = ForecastIndexService.getIndexRange(period.Index);
                        var date = moment(period.Period);

                        chart.data.push({
                            name: date.format('MM/DD'),
                            y: period.Index,
                            color: indexRange.color
                        });

                    });

                    deferred.resolve(chart);
                });

                return deferred.promise;
            },

            // annual view
            getAnnual: function (dataType, zip) {
                var deferred = $q.defer();

                $http.get(app.util.createWebApiUrl('forecast/annual/' + dataType + '/' + zip)).then(function (result) {
                    var forecastModel = result.data;
                    var chart = {};
                    var annual = [];

                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                    // Populate the chart data
                    _.each(forecastModel.Location.periods, function (period, key) {

                        // Add the chart data
                        var indexRange = ForecastIndexService.getIndexRange(period.Index);

                        annual.push({
                            name: months[key],
                            y: period.Index,
                            color: indexRange.color
                        });

                    });

                    chart.data = [
                        { data: annual }
                    ];

                    deferred.resolve(chart);
                });

                return deferred.promise;
            }

        }

    }]);

})();