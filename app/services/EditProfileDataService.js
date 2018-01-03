(function () {

    'use strict';

    var pollen = angular.module('pollen');

    pollen.service('EditProfileDataService', ['$http', '$q', function ($http, $q) {

        return {

            getProfile: function () {

                return $http.get(app.util.createWebApiUrl('profile')).then(function (response) {
                    return response.data;
                });

            },

            saveProfile: function (profile) {

                return $http.post(app.util.createWebApiUrl('profile'), profile);

            },

            getActivities: function () {

                var activities = [
                    'Biking',
                    'Running',
                    'Fishing',
                    'Hiking/Backpack',
                    'Hunting',
                    'Climbing',
                    'Camping',
                    'Health/Fitness'
                ];
                
                return activities;
            }
        }

    }]);
})();