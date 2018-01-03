(function () {

    'use strict';

    var pollen = angular.module('pollen');

    pollen.controller('EditProfileController', ['$scope', 'EditProfileDataService', 'AllergensDataService', 'CheckboxListService', 'SelectboxListService', 'MemberLocationService', function ($scope, EditProfileDataService, AllergensDataService, CheckboxListService, SelectboxListService, MemberLocationService) {

        var oldProfile;

        // Initialize scope
        $scope.profile = {};
        $scope.password = {
            Password1: '',
            Password2: ''
        };
        $scope.error = false;
        $scope.success = false;

        // Get activities choices
        var activities = EditProfileDataService.getActivities();

        // Get allergen choices
        var allergenChoices = AllergensDataService.getAllergens();

        // Get Profile
        EditProfileDataService.getProfile().then(function (profile) {
            $scope.profile = profile;
            $scope.activities = CheckboxListService.createCheckboxList(activities, profile.Activities);
            $scope.allergens = SelectboxListService.createSelectboxList(allergenChoices, profile.Allergens, 3);
            $scope.allergenChoices = allergenChoices;

            // Cache the old profile
            oldProfile = $.extend({}, profile);
        });

        // Save the profile data
        $scope.save = function () {

            // Create profile from scope
            var profile = {
                Profile: $scope.profile,
                Password: $scope.password
            };

            // Set the activities value
            profile.Profile.Activities = CheckboxListService.getCheckboxListValue($scope.activities);

            // Set the allergens value
            profile.Profile.Allergens = SelectboxListService.getSelectboxListValue($scope.allergens);

            // Save the profile
            EditProfileDataService.saveProfile(profile)
                .then(
                    function (response) {
                        if (response) {
                            $scope.error = false;
                            $scope.success = true;
                            $scope.profile = response.data;

                            // Save the new member zip
                            if (oldProfile && oldProfile.Zipcode !== profile.Zipcode) {
                                MemberLocationService.setMemberLocation(profile.Profile.Zipcode);
                            }
                        }
                    },
                    function (response) {
                        if (response) {
                            $scope.success = false;
                            $scope.error = true;

                            console.log(response);

                            var errors = [];
                            var modelState = response.data.ModelState;

                            // Add error messages to the scope
                            for (var key in modelState) {
                                for (var i = 0; i < modelState[key].length; i++) {
                                    errors.push(modelState[key][i]);
                                }
                            }

                            // Unknown error
                            if (errors.length === 0) {
                                errors.push('There was a problem saving your profile. Please try again later.');
                            }

                            $scope.modelState = modelState;
                            $scope.errors = errors;
                        }
                    }
                )
                .finally(function () {
                    $(window).scrollTop(0);
                });

        }

    }])
})();