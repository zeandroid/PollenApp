(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.directive('forecastDonutChart', function () {

        return {
            restrict: 'C',
            scope: { chart: '=' },
            link: function (scope, element, attrs) {
                scope.$watch('chart', function (chart) {
                    if (chart) {
                        var highChart = new Highcharts.Chart({
                            credits: { enabled: false },
                            exporting: { enabled: false },
                            tooltip: {
                                enabled: false,
                                formatter: function () {
                                    return chart.title;
                                }
                            },
                            title: { text: '' },
                            colors: [scope.chart.color, '#fff'],
                            chart: {
                                renderTo: element.get(0),
                                backgroundColor: null,
                                plotBackgroundColor: null,
                                plotBorderWidth: 0,
                                plotShadow: false,
                                margin: [0, 0, 0, 0],
                                spacingTop: 0,
                                spacingBottom: 0,
                                spacingLeft: 0,
                                spacingRight: 0
                            },
                            plotOptions: {
                                pie: {
                                    dataLabels: { enabled: false },
                                    size: '100%',
                                    startAngle: -180,
                                    endAngle: 180,
                                    borderWidth: 1,
                                    borderColor: '#ddd'
                                },
                                series: { states: { hover: { enabled: false } } }
                            },
                            series: [{
                                type: 'pie',
                                innerSize: '50%',
                                data: [
                                    ['Index', chart.percent],
                                    ['Empty', chart.invertedPercent]
                                ]
                            }]
                        });
                    }
                }, true);
            }
        }
    });
})();