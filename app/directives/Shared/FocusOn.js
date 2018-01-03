(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.directive('focusOn', function () {
        return function (scope, elem, attr) {
            scope.$on(attr.focusOn, function (e) {
                elem[0].focus();
            });
        };
    });

})();