function DataTable($) {
    "use strict";
    var settings = {
        rows: 30
    };
    var pageToLoad = 0;
    var maxPage = 7;

    function updatePaginator() {
        var container = $(settings.container);
        if (pageToLoad === 0) {
            container.find('.ui-paginator-first').addClass('ui-state-disabled');
            container.find('.ui-paginator-prev').addClass('ui-state-disabled');
        } else {
            container.find('.ui-paginator-first').removeClass('ui-state-disabled');
            container.find('.ui-paginator-prev').removeClass('ui-state-disabled');
        }

        if (pageToLoad === maxPage) {
            container.find('.ui-paginator-last').addClass('ui-state-disabled');
            container.find('.ui-paginator-next').addClass('ui-state-disabled');
        } else {
            container.find('.ui-paginator-last').removeClass('ui-state-disabled');
            container.find('.ui-paginator-next').removeClass('ui-state-disabled');
        }

        container.find('.ui-paginator-current').html('(' + (pageToLoad + 1) + ' of ' + (maxPage + 1) + ')');
    }

    function updateTable() {
        var data = {
            page: pageToLoad,
            rows: settings.rows,
            action: 'load',
            expansion: "CON"
        };

        var onSuccess = function (data) {
            var i, j, row, cell, cards, table, tbody, value;

            cards = data.cards;
            table = $(settings.container).find('table');
            tbody = $('<tbody/>').addClass('ui-datatable-data ui-widget-content');

            for (i = 0; i < cards.length; i++) {
                row = $('<tr/>').addClass('ui-widget-content').addClass((i % 2 === 0 ? 'ui-datatable-even' : 'ui-datatable-odd'));
                for (j = 0; j < settings.columnModel.length; j++) {
                    value = cards[i][settings.columnModel[j].key];
                    if (settings.columnModel[j].format) {
                        value = settings.columnModel[j].format(cards[i]);
                    }
                    cell = $('<td><div class="ui-dt-c">' + value + '</div></td>');
                    row.append(cell);
                }
                row.addClass(settings.rowClass(cards[i]));
                row.attr('id', cards[i].id);
                tbody.append(row);
            }

            if (table.find('tbody').length === 0) {
                table.append(tbody);
            } else {
                table.find('tbody').replaceWith(tbody);
            }

            maxPage = Math.floor(data.totalRows / settings.rows);
            updatePaginator();
        };

        $.ajax({
            url: settings.url,
            dataType: 'json',
            data: data,
            success: onSuccess
        });
    }

    function addPaginator() {
        var container, paginator;

        container = $(settings.container);
        if (container.find('.ui-paginator').length === 0) {
            paginator = $('<div class="ui-paginator ui-paginator-top ui-widget-header"></div>');
            container.append(paginator);

            paginator.append('<span class="ui-paginator-first ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-first">p</span></span>');
            paginator.append('<span class="ui-paginator-prev ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-prev">p</span></span>');
            paginator.append('<span class="ui-paginator-current">(1 of 1)</span>');
            paginator.append('<span class="ui-paginator-next ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-next">p</span></span>');
            paginator.append('<span class="ui-paginator-last ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-end">p</span></span>');
        }
    }

    function addHeader() {
        var i, element, columnModel, htmlString, container;

        container = $(settings.container);
        if (container.find('table').length === 0) {
            element = $('<table/>');
            container.append(element);
            element.append('<thead><tr></tr></thead>');
            element = element.find('thead tr');
            for (i = 0; i < settings.columnModel.length; i++) {
                columnModel = settings.columnModel[i];
                htmlString = '<div class="ui-dt-c">';
                if (columnModel.sortable) {
                    htmlString += '<span class="ui-sortable-column-icon ui-icon ui-icon-carat-2-n-s"></span>';
                }
                htmlString += '<span>' + columnModel.name + '</span>';
                htmlString += '</div>';
                element.append($('<th/>').html(htmlString).addClass('ui-state-default' + (columnModel.sortable ? ' ui-sortable-column' : '')));
            }
        }
    }

    function attachEvents() {
        var container = $(settings.container);
        var firstPage = function () {
            pageToLoad = 0;
            updateTable();
        };
        var prevPage = function () {
            pageToLoad--;
            updateTable();
        };
        var nextPage = function () {
            pageToLoad++;
            updateTable();
        };
        var lastPage = function () {
            pageToLoad = maxPage;
            updateTable();
        };

        container.on('click', '.ui-paginator-first:not(.ui-state-disabled)', firstPage);
        container.on('click', '.ui-paginator-prev:not(.ui-state-disabled)', prevPage);
        container.on('click', '.ui-paginator-next:not(.ui-state-disabled)', nextPage);
        container.on('click', '.ui-paginator-last:not(.ui-state-disabled)', lastPage);
        container.on('click', '.ui-datatable-data tr', function (){
            $.ajax({
                url: settings.url,
                dataType: 'json',
                data: {
                    action: 'getEdition',
                    cardId: this.id
                },
                success: function (data){
                    $('#dialog').html('<img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + data.gathererId + '&type=card"/>').dialog();
                }
            });
        });
    }

    var init = function (options) {

        if (options) {
            $.extend(settings, options);
        }

        $(settings.container).addClass('ui-datatable ui-widget');

        if ($(settings.container).find('table').length === 0) {
            addPaginator();
            addHeader();
            attachEvents();
        }
        updateTable();
    };

    return {
        init: init
    };
}