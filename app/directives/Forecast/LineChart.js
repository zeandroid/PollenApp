(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.directive('forecastLineChart', ['ForecastChartService', 'ForecastIndexService', function (ForecastChartService, ForecastIndexService) {

        var ranges = ForecastIndexService.getAllRanges();
        var zones = [];

        _.each(ranges, function (range, key) {
            zones.push({
                value: range.range[1],
                color: range.color
            });
        });

        return {
            restrict: 'C',
            scope: { chart: '=' },
            link: function (scope, element, attrs) {
                scope.$watch('chart', function (chart) {

                    if (chart) {
                        var chartSettings = ForecastChartService.lineBarChartSettings();
                        var lineSettings = {
                            chart: {
                                type: 'spline',
                                renderTo: element.get(0)
                            },
                            tooltip: {
                                enabled: true
                            },                            
                            series: [{
                                data: chart.data,
                                zones: zones,
                                lineWidth: 3,
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        }

                        var combinedSettings = $.extend(true, {}, chartSettings, lineSettings);
                        var highChart = new Highcharts.Chart(combinedSettings);
                    }

                }, true);
            }
        };
    }]);

})();