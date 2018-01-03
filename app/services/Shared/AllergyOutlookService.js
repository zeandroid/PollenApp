(function () {

    'use strict';

    var shared = angular.module('shared');

    shared.service('AllergyOutlookService', ['$cookies', '$q', '$http', 'LocationService', '$rootScope', '$timeout', function ($cookies, $q, $http, LocationService, $rootScope) {

        var allergyOutlookCookieName = 'geo';

        var setAllergyOutlookLocation = function (zip) {
            var now = new Date();
            var cookieExpires = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

            // Add the zipcode to the cookie
            $cookies.put(allergyOutlookCookieName, zip, { expires: cookieExpires, path: '/' });
        };

        return {

            getAllergyOutlook: function (zip) {
                var deferred = $q.defer();

                var zip = LocationService.getCurrentLocation();

                if (zip) {
                    // The zipcode already exists in the cookie
                    var param = { zip: zip };

                    $rootScope.$broadcast('outlook.loading');
                    $http.get(app.util.createWebApiUrl('forecast/outlook/{zip}', param))
                        .success(function (outlook) {
                            deferred.resolve(outlook);
                        })
                        .finally(function () {
                            $rootScope.$broadcast('outlook.loadingComplete');
                        });
                } else {
                    // The zipcode doesn't exist in the cookie, get zip from geo location
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            function (position) {
                                var param = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };

                                $rootScope.$broadcast('outlook.loading');
                                $http.get(app.util.createWebApiUrl('forecast/outlook/{lat}/{lng}/', param))
                                    .success(function (outlook) {
                                        if (outlook) {
                                            setAllergyOutlookLocation(outlook.ZIP);
                                            deferred.resolve(outlook);
                                        }
                                    })
                                    .finally(function () {
                                        $rootScope.$broadcast('outlook.loadingComplete');
                                    });
                            }
                        );
                    }
                }

                return deferred.promise;
            }

        }

    }]);

})();