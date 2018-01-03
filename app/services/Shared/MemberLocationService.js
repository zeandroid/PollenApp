(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.service('MemberLocationService', ['$cookies', 'LocationService', function ($cookies, LocationService) {

        var memberLocationCookieName = 'member';

        return {

            getMemberLocation: function () {
                return $cookies.get(memberLocationCookieName);
            },

            setMemberLocation: function (zip) {
                var now = moment();
                var cookieExpires = now.add(6, 'months').toDate();

                // Add the zipcode to the cookie
                $cookies.put(memberLocationCookieName, zip, { expires: cookieExpires, path: '/' });

                // Update current location
                LocationService.setCurrentLocation(zip);
            }

        }

    }]);
})();