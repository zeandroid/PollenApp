(function () {

    'use strict';

    angular.module('forecast').controller('DiaryEntryController', ['$scope', '$rootScope', 'DiaryUrlService', 'DiaryEntryDataService', 'CheckboxListService', 'SelectboxListService', 'AllergensDataService', function ($scope, $rootScope, DiaryUrlService, DiaryEntryDataService, CheckboxListService, SelectboxListService, AllergensDataService) {

        var saveEntry = function () {
            // Get entry from scope
            var entry = $scope.entry;
            entry.Symptoms = CheckboxListService.getCheckboxListValue($scope.symptoms);
            entry.Allergens = SelectboxListService.getSelectboxListValue($scope.allergens);

            // Post to diary api
            DiaryEntryDataService.saveDiaryEntry(entry).then(saveEntrySuccess, saveEntryFail);
        };

        var saveEntrySuccess = function (response) {
            if (response) {
                $scope.ErrorSubmit = false;
                $scope.SuccessfulSubmit = true;

                $scope.entry = response.data;

                // Notify subscribers that the entry has been added
                $rootScope.$broadcast("diary.entryAdded", response.data);
            }
        };

        var saveEntryFail = function (response) {
            if (response) {
                $scope.SuccessfulSubmit = false;
                $scope.ErrorSubmit = true;
            }
        };

        var setScope = function (entryDate) {
            // Bind diary entry form scope
            $scope.SuccessfulSubmit = false;
            $scope.ErrorSubmit = false;
            $scope.sufferingChoices = sufferingChoices;
            $scope.allergenChoices = allergenChoices;
            $scope.save = saveEntry;

            // Get diary entry and set scope
            DiaryEntryDataService.getDiaryEntry(entryDate).then(setDiaryEntryScope);
        };

        var setDiaryEntryScope = function (entry) {
            $scope.entry = entry;
            $scope.symptoms = CheckboxListService.createCheckboxList(symptomChoices, entry.Symptoms);
            $scope.allergens = SelectboxListService.createSelectboxList(allergenChoices, entry.Allergens, 3);
        };

        // Get list choices
        var allergenChoices = AllergensDataService.getAllergens();
        var sufferingChoices = DiaryEntryDataService.getSuffering();
        var symptomChoices = DiaryEntryDataService.getSymptoms();

        // Listen for diary entry url change
        $rootScope.$on('diary.dateChanged', function (event, date) {
            setScope(date);
        });

    }]);
})();