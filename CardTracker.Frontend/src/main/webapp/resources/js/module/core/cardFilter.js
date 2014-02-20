define(['jquery', 'amplify'], function ($, amplify) {
    "use strict";
    return function (options) {
        var settings = {};
        var filter = {};

        var updatePaginator = function () {
            amplify.publish(settings.topic, filter);
        };
        var onChangeTriState = function (e) {
            if (e.target.value !== 'any') {
                filter[e.target.name] = e.target.value;
            } else {
                delete filter[e.target.name];
            }
            updatePaginator();
        };
        var onMultiselectChange = function (e) {
            if (e.target.value !== 'any') {
                var i, selected = [];
                var options = e.target.options;
                for (i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                        selected.push(options[i].value);
                    }
                }
                filter[e.target.name] = selected;
            } else {
                delete filter[e.target.name];
            }
            updatePaginator();
        };
        var onTextBlur = function (e) {
            if (e.target.value !== '') {
                filter[e.target.name] = e.target.value;
            } else {
                delete filter[e.target.name];
            }
            updatePaginator();
        };
        var onTextSubmit = function (e) {
            if (e.which === 13) {
                if (e.target.value !== '') {
                    filter[e.target.name] = e.target.value;
                } else {
                    delete filter[e.target.name];
                }
                updatePaginator();
            }
        };

        var init = function (options) {
            var params, pair, i;
            if (options) {
                $.extend(settings, options);
            }

            // sets filter based on url params
            if (location.search.length > 1) {
                params = decodeURI(location.search.substr(1)).split('&');
                for (i = 0; i < params.length; i++) {
                    pair = params[i].split('=');
                    if (pair[0] === 'expansion') {
                        $("#editionFilter option[value='" + pair[1] + "']").attr('selected', true);
                        filter['expansion'] = filter['expansion'] || [];
                        filter['expansion'].push(pair[1]);
                    } else {
                        filter[pair[0]] = pair[1];
                    }
                }
            }

            updatePaginator();

            $('#implementedFilter').on('change', onChangeTriState);
            $('#requestedFilter').on('change', onChangeTriState);
            $('#buggedFilter').on('change', onChangeTriState);
            $('#testedFilter').on('change', onChangeTriState);
            $('#typeFilter').on('change', onMultiselectChange);
            $('#colorFilter').on('change', onMultiselectChange);
            $('#editionFilter').on('change', onMultiselectChange);
            $('#developerFilter').on('change', onMultiselectChange);
            $('#abilitiesFilter').on('blur', onTextBlur);
            $('#abilitiesFilter').on('keypress', onTextSubmit);
            $('#subtypeFilter').on('blur', onTextBlur);
            $('#subtypeFilter').on('keypress', onTextSubmit);
            $('#nameFilter').on('blur', onTextBlur);
            $('#nameFilter').on('keypress', onTextSubmit);
        };

        init(options);

        return {
        };
    };
});
