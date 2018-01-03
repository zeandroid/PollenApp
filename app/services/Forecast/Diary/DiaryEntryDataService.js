(function () {

    'use strict';

    var forecast = angular.module('forecast');

    forecast.service('DiaryEntryDataService', ['$http', function ($http) {

        return {

            /* Returns the diary entry for specificed entryDate */
            getDiaryEntry: function (entryDate) {
                
                var monthDayYear = {
                    month: entryDate.getMonth() + 1,
                    day: entryDate.getDate(),
                    year: entryDate.getFullYear()
                };

                return $http.get(app.util.createWebApiUrl('diary/{month}/{day}/{year}', monthDayYear)).then(function (response) {
                    return response.data;
                });

            },

            saveDiaryEntry: function (entry) {

                return $http.post(app.util.createWebApiUrl('diary'), entry);

            },

            getSymptoms: function () {
                var symptoms = [
                    'Sneezing',
                    'Itchy Eyes',
                    'Runny Nose',
                    'Red Eyes',
                    'Headache',
                    'Watery Eyes',
                    'Coughing',
                    'Wheezing',
                    'Shortness of Breath',
                    'Fatigue',
                    'Sore Throat',
                    'Nasal Congestion'
                ];

                return symptoms;
            },

            getSuffering: function () {
                var suffering = [
                    'Great',
                    'Good',
                    'Average',
                    'Bad',
                    'Horrible'
                ];

                return suffering;
            }
        };

    }]);

})();