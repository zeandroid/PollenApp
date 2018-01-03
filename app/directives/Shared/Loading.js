(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.directive('loading', [function () {

        return {
            restrict: 'A',
            transclude: true,
            scope: { loading: '=' },
            templateUrl: '/shared/loading.html', // _Layout.cshtml
            link: function (scope, elem, attrs) { }
        }

    }]);

})();