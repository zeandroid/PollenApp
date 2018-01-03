(function () {
    'use strict';

    /* This is needed in order to correctly print the highcharts */
    var originalChartDimensions = [];

    var getCharts = function () {
        var charts = [];
        if (typeof Highcharts.charts !== 'undefined') {
            _.each(Highcharts.charts, function (chart, i) {
                if (chart) {
                    charts.push(chart);
                }
            });
        }
        return charts;
    }

    var setupPrint = function () {
        originalChartDimensions = [];
        var charts = getCharts();

        _.each(charts, function (chart, i) {
            originalChartDimensions.push({
                width: chart.chartWidth,
                height: chart.chartHeight
            });

            var $chart = $(chart.renderTo);

            if ($chart.is(':visible')) {
                // Pie charts get a special size
                if ($chart.hasClass('forecast-donut-chart')) {
                    chart.setSize(125, 125, false);
                } else {
                    chart.setSize(600, 200, false); //TODO: test with 600-670px range
                }
            }
        });
    };

    var teardownPrint = function () {
        var charts = getCharts();
        _.each(charts, function (chart, i) {
            chart.setSize(originalChartDimensions[i].width, originalChartDimensions[i].height, true);
            chart.hasUserSize = false;
        });
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        if (mediaQueryList.addListener) {
            mediaQueryList.addListener(function (mql) {
                if (mql.matches) {
                    setupPrint();
                } else {
                    teardownPrint();
                }
            });
        }
    }

    window.addEventListener('beforeprint', function (ev) {
        setupPrint();
    });

    window.addEventListener('afterprint', function (ev) {
        teardownPrint();
    });

})();