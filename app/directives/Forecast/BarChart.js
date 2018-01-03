(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.directive('forecastBarChart', ['ForecastChartService', function (ForecastChartService) {
        return {
            restrict: 'C',
            scope: { chart: '=' },
            link: function (scope, element, attrs) {
                scope.$watch('chart', function (chart) {
                    if (chart) {
                        var chartSettings = ForecastChartService.lineBarChartSettings();
                        var columnSettings = {
                            chart: {
                                type: 'column',
                                renderTo: element.get(0)
                            },
                            series: chart.data
                        };

                        if (chart.data && chart.data.length > 1) {
                            chartSettings.legend.enabled = true;
                        }

                        var combinedSettings = $.extend(true, {}, chartSettings, columnSettings);
                        var highChart = new Highcharts.Chart(combinedSettings);
                    }
                }, true);
            }
        }
    }]);

})();