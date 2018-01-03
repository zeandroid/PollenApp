(function () {

    'use strict';

    var forecast = new angular.module('forecast');

    forecast.directive('forecastDiaryChart', ['ForecastChartService', 'ForecastIndexService', function (ForecastChartService, ForecastIndexService) {

        var getYAxisTemplateString = function () {
            // Set template string
            var yAxisItemTemplateString = '<span style="display:block;"><span><%= label %></span><i class="legend-key-color" style="background:<%= color %>"></i></span>';

            return yAxisItemTemplateString;
        };

        return {
            restrict: 'C',

            scope: { chart: '=' },

            link: function (scope, element, attrs) {
                // need to watch the chart data for new values
                scope.$watch(
                    function () {
                        return scope.chart;
                    }, function (chart) {
                        if (chart) {
                            // Get the global line chart settings
                            var chartSettings = ForecastChartService.lineBarChartSettings();
                            var step = ForecastChartService.getStep();

                            // Get the index range map
                            var ranges = ForecastIndexService.getAllRangesDiary();

                            // Set custom settings for diary
                            var lineSettings = {
                                chart: {
                                    type: 'spline',
                                    alignTicks: false,
                                    renderTo: element.get(0)
                                },
                                tooltip: {
                                    enabled: true
                                },
                                legend: {
                                    enabled: true,
                                    align: 'left',
                                    verticalAlign: 'top',
                                    padding: 0,
                                    margin: 10
                                },
                                yAxis: [{
                                    title: '',
                                    min: 0,
                                    max: 5,
                                    tickInterval: 1,                                    
                                    labels: {
                                        useHTML: true,
                                        formatter: function () {
                                            return ForecastChartService.yAxisFormatter(ranges, getYAxisTemplateString, this.value.toFixed(1), 1);
                                        }
                                    }
                                }, {
                                    title: '',
                                    min: 0,
                                    max: 12,
                                    tickInterval: step,
                                    gridLineWidth: 0,
                                    minorGridLineWidth: 0,
                                    opposite: true
                                }],                                
                                series: chart.data
                            }

                            var combinedSettings = $.extend(true, {}, chartSettings, lineSettings);

                            // create new chart
                            new Highcharts.Chart(combinedSettings);
                        }
                    }, true);
            }
        };
    }]);

})();