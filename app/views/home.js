(function ($, app) {

    app.views.home = {

        $carousel: null,

        $map: null,

        $mapContainer: null,

        /*
         * Initialize home view
         */
        init: function () {
            var _this = this;

            // Initialize properties
            this.$carousel = $('#home-carousel');
            this.$carousel.carousel({interval:false});
            this.$map = $('#map');
            this.$mapContainer = $('#map-item');

            // Initialize the PollenMap
            this.initMap();

            // Add pollen map state click event
            this.$map.on('PollenMap.StateClick', function (event, state) {
                _this.onMapStateClick(state);
            });

            // On carousel slide event - check if map container visible so we can re-draw map
            // NOTE: this is needed because otherwise the map will not display in a hidden div that becomes visible
            this.$carousel.on('slid.bs.carousel', function (e) {
                _this.redrawMap(e.relatedTarget);
            });

        },

        /*
         * Initialize PollenMap custom plugin
         */
        initMap: function () {

            var _this = this;
            var responsiveMapOptions = this.getResponsiveMapOptions();
            var pollenMapOptions = {
                nationalZoomLevel: responsiveMapOptions.national,
                stateZoomLevel: responsiveMapOptions.state,
                mapCenter: responsiveMapOptions.mapCenter,
                markersEnabled: false,
                tilesEnabled: false,
                responsiveOptions: function () {
                    return _this.getResponsiveMapOptions();
                },
                stateLayerStyle: {
                    weight: 0.5
                },
                collapseLegend: responsiveMapOptions.collapseLegend,
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
            };

            this.$map.PollenMap(pollenMapOptions);
        },

        /* 
         * Gets responsive map options for responsive zoom levels and collapse legend functionality
         * @returns {Object} responsiveMapOptions 
         */
        getResponsiveMapOptions: function () {
            var windowWidth = $(window).width();
            var options = {};

            if (app.util.isBreakpoint('lg')) {
                options.national = 4;
                options.state = 2;
                options.collapseLegend = false;
                options.mapCenter = [37.8, -94];
            } else if (app.util.isBreakpoint('md')) {
                options.national = 3.5;
                options.state = 1.5;
                options.collapseLegend = true;
                options.mapCenter = [38.75, -93.5];
            } else if (app.util.isBreakpoint('sm')) {
                options.national = 3;
                options.state = 3;
                options.collapseLegend = true;
                options.mapCenter = [39.15, -93.5];
            } else if (app.util.isBreakpoint('xs')) {
                options.national = 3;
                options.state = 3;
                options.collapseLegend = true;
                options.mapCenter = [37.75, -96];
            }

            return options;
        },

        /*
         * @param {String} state - e.g. 'CA'
         * Redirects to Map controller with state as param
         */
        onMapStateClick: function (state) {
            window.location.href = app.util.createUrl('map/{state}', { state: state });
        },

        /*
         * @param {JQuery} $activeSlide - active slide jquery object
         * Triggers the pollen map redraw if the map is the active slide
         */
        redrawMap: function ($activeSlide) {
            if ($activeSlide.id === this.$mapContainer.get(0).id) {
                this.$map.trigger('PollenMap.Redraw');
            }
        }

    }

})(window.jQuery, window.app || {});