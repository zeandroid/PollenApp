(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.service('SelectboxListService', [function () {

        return {

            createSelectboxList: function (items, selectboxListValue, numberOfSelectBoxes) {

                // Initialize list
                var selectboxList = [];
                _(numberOfSelectBoxes).times(function () {
                    selectboxList.push('');
                });

                if (selectboxListValue) {
                    var values = selectboxListValue.split(',');
                    _.each(selectboxList, function (allergen, key) {
                        if (values[key]) {
                            selectboxList[key] = values[key];
                        }
                    });
                }

                return selectboxList;

            },

            getSelectboxListValue: function (selectboxList) {
                var selectboxValue = '';

                var values = _.filter(selectboxList, function (allergen) {
                    return allergen;
                });

                if (values.length > 0) {
                    selectboxValue = values.join();
                }

                return selectboxValue;
            }
        }

    }]);

})();