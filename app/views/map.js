(function ($, app) {

    app.views.map = {

        /*
         * @param {jQuery} $element map element
         * @param focusState the state we want to focus on the map e.x. 'CA'
         * Initiializes map view
         */
        init: function ($element, focusState) {

            // Adjust height to 75% of window height (fixes buggy vh value)
            $element.height($(window).height() * 0.75);

            var mapOptions = {
                focusState: focusState,
                nationalZoomLevel: 4,
                stateZoomLevel: 6,
                mapDataUrl: app.util.createWebApiUrl('map'),
                mapNationalCitiesUrl: app.util.createWebApiUrl('map/cities'),
                mapStateCitiesUrl: function (p) {
                    return app.util.createWebApiUrl('map/cities/{state}', p);
                },
                markerLinkUrl: function (p) {
                    return app.util.createUrl('forecast/current/pollen/{zip}', p);
                },
                marketsUrl: app.util.createStaticUrl('Scripts/CustomPlugins/PollenMap/geojson/pollen_markets.json'),
                statesUrl: app.util.createStaticUrl('Scripts/CustomPlugins/PollenMap/geojson/states.json'),
                markerImageUrl: app.util.createStaticUrl('Content/leaflet-icons/marker-icon.png'),
                markerShadowUrl: app.util.createStaticUrl('Content/leaflet-icons/marker-shadow.png')
            }

            // Create pollen map
            $element.PollenMap(mapOptions);
        }

    }

})(window.jQuery, window.app || {});