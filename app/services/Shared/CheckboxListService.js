(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.service('CheckboxListService', [function () {

        return {

            createCheckboxList: function (items, checkboxValue) {
                var count = 1;
                var checkboxList = [];

                _.each(items, function (item, key) {
                    var isSelected = (checkboxValue & Math.pow(2, key)) !== 0;
                    checkboxList.push({ name: item, value: count, isSelected: isSelected });
                    count *= 2;
                });

                return checkboxList;

            },

            getCheckboxListValue: function (checkboxList) {
                var total = 0;
                var selected = _.where(checkboxList, { isSelected: true });

                _.each(selected, function (listItem) {
                    total += 1 * listItem.value;
                });

                return total;
            }
        }

    }]);

})();
