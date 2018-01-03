(function () {
    'use strict';

    var shared = angular.module('shared');

    shared.directive('typeaheadClear', [function () {

        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                if (attr.typeaheadClear == 'true') {
                    elem.on('blur', function () {
                        elem.val(''); // clear the element value

                        // update typeahead no results
                        var noResults = attr.typeaheadNoResults;
                        if (noResults) {
                            scope[noResults] = false;
                            scope.$apply();
                        }

                    });
                }
            }
        };

    }]);
})();