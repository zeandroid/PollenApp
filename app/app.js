(function () {
    
    'use strict';

    // Create angular module(s)
    var forecast = angular.module('forecast', []);
    var research = angular.module('research', []);
    var allergy = angular.module('allergy', []);
    var shared = angular.module('shared', []);
    var pollen = angular.module('pollen', ['ngCookies', 'ui.bootstrap', 'forecast', 'research', 'allergy', 'shared']);

    window.app = {

        // Create views namespace
        views: {},

        // Create ui namespace for ui components
        ui: {},

        // Create app config
        config: {},

        /*
         * @param {Object} config
         * Initialize config
         */
        init: function (config) {

            this.config = config;

        }
    }

})();