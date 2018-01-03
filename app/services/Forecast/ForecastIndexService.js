(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.service('ForecastIndexService', function () {
        var maxIndex = 12;

        var forecastIndexRanges = [
            { range: [0, 2.4], label: 'low', color: '#03672a', title: 'Pollen levels between 0 and 2.4 tend to affect very few individuals among the allergy-suffering public.' },
            { range: [2.5, 4.8], label: 'low-medium', color: '#8dc300', title: 'Pollen levels between 2.5 and 4.8 tend to start affecting individuals extremely sensitive to the predominant pollens.' },
            { range: [4.9, 7.2], label: 'medium', color: '#F3C700', title: 'Pollen levels between 4.9 and 7.2 will likely cause symptoms for many individuals who suffer from allergies to the predominant pollen types of the season.' },
            { range: [7.3, 9.6], label: 'medium-high', color: '#E2841B', title: 'Pollen levels between 7.3 and 9.6 tend to affect a large number of individuals who suffer from allergies to the pollen types of the season.' },
            { range: [9.7, maxIndex], label: 'high', color: '#D74302', title: 'Pollen levels between 9.7 and 12.0 tend to affect most individuals who suffer from allergies to the pollen types of the season. Symptoms may become more severe during days with high pollen levels.' }
        ];

        return {
            getIndexRange: function (index) {
                var indexRange = _.find(forecastIndexRanges, function (forecastIndexRange) {
                    var fallsWithinIndexRange = index >= forecastIndexRange.range[0] && index <= forecastIndexRange.range[1];
                    return fallsWithinIndexRange;
                });

                return indexRange;
            },

            getForecastIndexPercentages: function (index) {
                var percent = parseInt((index / maxIndex) * 100);
                var invertedPercent = 100 - percent;
                return { percent: percent, invertedPercent: invertedPercent };
            },

            getAllRanges: function () {
                return forecastIndexRanges;
            },

            getAllRangesDiary: function () {
                var ranges = this.getAllRanges();
                var diaryRanges = [];

                var diaryLabels = [
                    { label: 'Great' },
                    { label: 'Good' },
                    { label: 'Average' },
                    { label: 'Bad' },
                    { label: 'Horrible' }
                ];

                _.each(ranges, function (range, index) {
                    diaryRanges.push($.extend({}, range, diaryLabels[index]));
                });

                return diaryRanges;
            }
        }
    });

})();