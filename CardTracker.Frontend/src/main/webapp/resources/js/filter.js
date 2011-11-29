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
            } else {
                delete filter[e.target.name];
            }
            settings.paginator.update(0);
        }
        var onExpansionChange = function (e) {
            if (e.target.value != 'any') {
                var selected = [];
                var options = e.target.options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                        selected.push(options[i].value);
                    }
                }
                filter[e.target.name] = selected;
            } else {
                delete filter[e.target.name];
            }
            settings.paginator.update(0);
        }
        var onAbilitiesChange = function (e) {
            if (e.target.value != '') {
                filter[e.target.name] = e.target.value;
            } else {
                delete filter[e.target.name];
            }
            settings.paginator.update(0);
        }
        $('#implementedFilter').on('change', onChangeTriState);
        $('#requestedFilter').on('change', onChangeTriState);
        $('#editionFilter').on('change', onExpansionChange);
        $('#abilitiesFilter').on('blur', onAbilitiesChange);
    }

    return {
        init: init,
        getFilter: function () {
            return filter;
        },
        setPaginator: function (paginator) {
            settings.paginator = paginator;
        }
    };
}
