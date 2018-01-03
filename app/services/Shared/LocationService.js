(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.service('LocationService', ['$cookies', 'currentLocation', function ($cookies, currentLocation) {

        var currentLocationCookieName = 'search';

        return {

            getCurrentLocation: function () {
                return currentLocation;
            },

            setCurrentLocation: function (location) {
                $cookies.put(currentLocationCookieName, location, { path: '/' });
            }
        }

    }]);

})();