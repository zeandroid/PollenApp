(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.directive('memberCalendar', ['MemberCalendarDataService', '$rootScope', '$timeout', 'DiaryUrlService', function (MemberCalendarDataService, $rootScope, $timeout, DiaryUrlService) {

        var entries = {};
        var $element = null;

        $rootScope.$on('diary.entryAdded', function (event, entry) {
            var date = moment(entry.DiaryDate).toDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var day = date.getDate();
            var score = entry.SufferingScore;

            MemberCalendarDataService.addCalendarEntry(month, day, year, score);
            getCalendarEntries(year, month);
        });

        var redirectToDiary = function (dateText) {
            var date = new Date(dateText);
            window.location = DiaryUrlService.createDiaryUrl(date);
        };

        var addEntriesToCalendar = function (date) {
            var dateString = moment(date).format('M/D/YYYY');
            var result = [true, '', null];
            var matching = entries[dateString];

            if (matching) {
                result = [true, 'highlight sscore-' + matching, null];
            }
            return result;
        };

        var getCalendarEntries = function (year, month) {
            MemberCalendarDataService.getCalendarEntries(year, month).then(function (theEntries) {
                $.each(theEntries, function (index, value) {
                    entries[month + '/' + index + '/' + year] = value;
                });

                $element.datepicker('refresh');
            });
        };

        var setCalendarDate = function (year, month, day, element) {
            // Set current month and year on the calendar
            element.datepicker('setDate', new Date(year, month - 1, day));

            // Get calendar entries for current month and year
            getCalendarEntries(year, month, element);
        };

        return {

            restrict: 'C',

            scope: {
                date: '='
            },

            link: function (scope, element, attrs) {

                $element = element;

                var updateCalendarScope = function (year, month) {
                    // Must wrap scope change in timeout, or scope change will not fire
                    $timeout(function () {
                        scope.date.month = month;
                        scope.date.year = year;
                    });
                };

                // Create datepicker widget
                element.datepicker({
                    changeYear: true,
                    yearRange:"2000:+1",
                    onSelect: redirectToDiary,
                    beforeShowDay: addEntriesToCalendar,
                    onChangeMonthYear: updateCalendarScope
                });

                // Watch for changes on the date scope
                scope.$watch('date', function (date) {
                    var year = date.year;
                    var month = date.month;
                    var day = date.day;
                    if (year && month) {
                        setCalendarDate(year, month, day, element);
                    }
                }, true);
            }
        };

    }]);

})();