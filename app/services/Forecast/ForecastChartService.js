(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.factory('ForecastChartService', ['ForecastIndexService', function (ForecastIndexService) {

        var step = 2.4;

        var getYAxisTemplateString = function () {
            // Set template string
            var yAxisItemTemplateString = '<ul title="<%= title %>">' +
                '<li class="chart-axis-label"><%= label %></li>';


            if (!app.util.isBreakpoint('xs')) {
                yAxisItemTemplateString += '<li class="chart-axis-range">&nbsp;(<%=range[0] %> - <%=range[1] %>)</li>' +
                '<li class="chart-axis-color"><i class="legend-key-color" style="background:<%= color %>"></i></li>';
            }

            yAxisItemTemplateString += '</ul>';

            return yAxisItemTemplateString;
        }

        return {

            getStep: function () {
                return step;
            },            

            yAxisFormatter: function (ranges, getTemplateStringFunction, value, s) {
                var index = {};
                var current = 0;
                var templateString = getTemplateStringFunction();

                // Build index range html map
                _.each(ranges, function (range, i) {
                    var beginningRange = range.range[0];
                    var indexKey = current !== 0 ? current.toFixed(1) : '0.0';
                    var endRange = range.range[1];
                    var legendTemplate = _.template(templateString);
                    index[indexKey] = legendTemplate(range);
                    current = (current + s);
                });
                return index[value];
            },

            lineBarChartSettings: function () {
                // Get the index range map
                var ranges = ForecastIndexService.getAllRanges();

                // Save reference to this
                var _this = this;

                // Set the highcharts settings
                var settings = {
                    credits: {
                        enabled: false
                    },
                    title: '',
                    tooltip: {
                        enabled: false
                    },
                    chart: {
                        backgroundColor: null,
                        spacingTop: 10,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        title: '',
                        min: 0,
                        max: 12,
                        tickInterval: step,
                        labels: {
                            useHTML: true,
                            formatter: function () {
                                return _this.yAxisFormatter(ranges, getYAxisTemplateString, this.value.toFixed(1), step);
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            name: 'Allergy Index',
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    }
                };

                return settings;
            }
        };
    }]);
})();