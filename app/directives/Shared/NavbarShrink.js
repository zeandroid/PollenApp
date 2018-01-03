(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.directive('navbarShrink', [function () {
        return {
            restrict: 'C',
            link: function (scope, elem, attrs) {
                $(window).scroll(function () {
                    if ($(document).scrollTop() > 50) {
                        elem.addClass('shrink');
                    }
                    else {
                        elem.removeClass('shrink');
                    }
                });
            }
        }
    }]);

})();