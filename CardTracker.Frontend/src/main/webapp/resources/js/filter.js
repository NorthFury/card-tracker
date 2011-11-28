function CardsFilter($) {
    "use strict";
    var settings = {};
    var filter = {};

    var init = function (options) {
        var params, pair, i;
        if (options) {
            $.extend(settings, options);
        }

        // sets filter based on url params
        if(location.search.length > 1){
            params = decodeURI(location.search.substr(1)).split('&');
            for (i = 0; i<params.length; i++) {
                pair = params[i].split('=');
                filter[pair[0]] = pair[1];
            }
        }

        // atachEvents
        var onChangeTriState = function (e) {
            if (e.target.value != 'any') {
                filter[e.target.name] = e.target.value;
            }
        }
        $('#implementedFilter').on('change', onChangeTriState);
        $('#requestedFilter').on('change', onChangeTriState);
        $('#editionFilter').on('change', onChangeTriState);
    }

    return {
        init: init,
        getFilter: function () {
            return filter;
        }
    };
}
