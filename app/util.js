(function (app, $) {

    app.util = {

        /*
        * @param {string} alias bootstrap alias e.g 'xs', sm', 'md', 'lg'
        * @param {boolean} returns true if alias is the active breakpoint
        */
        isBreakpoint: function (alias) {
            return $('.device-' + alias).is(':visible');
        },

        /*
         * @param {string} url
         * replaces spaces in the url with a '-'
         */
        prettifyUrl: function (url) {
            return url.replace(/\s/g, '-');
        },

        /*
         * @param {string} url e.x. '/forecast/{city}/{state}/{zip}'
         * @param {object} params e.x. { city: 'San Francisco', state: 'CA', zip: '94109' }
         * creates a url based on template converts to lower case and prettifies url e.x. /forecast/san-francisco/ca/94109
         */
        createUrl: function (url, params) {
            var baseUrl = app.config.siteBaseUrl;
            var url = this.prettifyUrl(this.template(url, params)).toLowerCase();
            return baseUrl + url;
        },

        /*
         * @param {string} url e.x. '/map/{state}'
         * @param {object} params e.x. { state: 'CA' }
         * creates a web api url based on template
         */
        createWebApiUrl: function (url, params) {
            var baseUrl = app.config.webApiUrl;
            var url = this.template(url, params);
            return baseUrl + url;
        },

        /*
         * @param {string} url
         * Creates a url for static content
         */
        createStaticUrl: function (url) {
            return app.config.siteBaseUrl + url;
        },

        /*
         * @param {string} string e.x. 'hi, {name}'
         * @param {object} params e.x. { name: 'Bob' }
         * templates a string by replacing the {} with paramaters e.x. 'hi, Bob'
         */
        template: function (string, params) {
            var newStr = string;
            var replacer = function (a, b) {
                var split = b.replace(/^\s*/, "").replace(/\s*$/, "").split('.');
                var temp = params;
                for (var x in split) {
                    temp = temp[split[x]];
                    if (temp == undefined) {
                        return '';
                    }
                }
                return temp;
            };
            return newStr.replace(/{([^{}]*)}/g, replacer);
        }
    }

})(window.app || {}, window.jQuery);