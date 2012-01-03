function DataTable($) {
    "use strict";
    var settings = {
        rows: 30,
        pageToLoad: 0,
        maxPage: 0
    };

    function updatePaginator() {
        if (settings.filter && settings.filter.getFilter().changed) {
            settings.filter.getFilter().changed = false;
            var data = {
                page: settings.pageToLoad,
                rows: settings.rows,
                action: 'getCount'
            };

            $.extend(data, settings.filter.getFilter());
            delete data.changed;

            $.ajax({
                url: settings.url,
                traditional: true,
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (data) {
                    settings.totalRows = data.totalRows;
                    settings.maxPage = Math.floor(Math.max(0, data.totalRows - 1) / settings.rows);
                    updatePaginator();
                }
            });
        } else {
            var container = $(settings.container);
            if (settings.pageToLoad === 0) {
                container.find('.ui-paginator-first').addClass('ui-state-disabled');
                container.find('.ui-paginator-prev').addClass('ui-state-disabled');
            } else {
                container.find('.ui-paginator-first').removeClass('ui-state-disabled');
                container.find('.ui-paginator-prev').removeClass('ui-state-disabled');
            }

            if (settings.pageToLoad === settings.maxPage) {
                container.find('.ui-paginator-last').addClass('ui-state-disabled');
                container.find('.ui-paginator-next').addClass('ui-state-disabled');
            } else {
                container.find('.ui-paginator-last').removeClass('ui-state-disabled');
                container.find('.ui-paginator-next').removeClass('ui-state-disabled');
            }

            container.find('.ui-paginator-current').html('(' + (settings.pageToLoad + 1) + ' of ' + (settings.maxPage + 1) + ') (Total: ' + settings.totalRows + ')');
        }
    }

    var updateTable = function (page) {
        if (typeof (page) !== 'undefined') {
            settings.pageToLoad = page;
        }
        var data = {
            page: settings.pageToLoad,
            rows: settings.rows,
            action: 'load'
        };

        if (settings.sortColumn) {
            data.sortColumn = settings.sortColumn;
            data.sortAscending = settings.sortAscending;
        }

        if (settings.filter) {
            $.extend(data, settings.filter.getFilter());
            delete data.changed;
        }

        var onSuccess = function (data) {
            var i, j, row, cell, cards, table, tbody, value;

            settings.cardsData = data.cards;
            cards = data.cards;
            table = $(settings.container).find('table');
            tbody = $('<tbody/>').addClass('ui-datatable-data ui-widget-content');

            for (i = 0; i < cards.length; i++) {
                row = $('<tr/>').addClass('ui-widget-content').addClass((i % 2 === 0 ? 'ui-datatable-even' : 'ui-datatable-odd'));
                for (j = 0; j < settings.columnModel.length; j++) {
                    if (settings.columnModel[j].format) {
                        value = settings.columnModel[j].format(cards[i]);
                    } else {
                        value = cards[i][settings.columnModel[j].key] || '';
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
            updatePaginator();
        };

        $.ajax({
            url: settings.url,
            traditional: true,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: onSuccess
        });
    };

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
                element.append($('<th/>').attr('name', columnModel.name).html(htmlString).addClass('ui-state-default' + (columnModel.sortable ? ' ui-sortable-column' : '')));
            }
        }
    }

    function attachEvents() {
        var container = $(settings.container);
        var firstPage = function () {
            settings.pageToLoad = 0;
            updateTable();
        };
        var prevPage = function () {
            settings.pageToLoad--;
            updateTable();
        };
        var nextPage = function () {
            settings.pageToLoad++;
            updateTable();
        };
        var lastPage = function () {
            settings.pageToLoad = settings.maxPage;
            updateTable();
        };
        var sort = function (e) {
            var $this = $(this);
            var icon, active;

            active = $('.ui-sortable-column.ui-state-active');
            if (active.attr('name') !== $this.attr('name')) {
                active.removeClass('ui-state-active');
                active.find('.ui-sortable-column-icon').removeClass('ui-icon-triangle-1-n ui-icon-triangle-1-s').addClass('ui-icon-carat-2-n-s');
                $this.addClass('ui-state-active');
            }

            settings.sortColumn = $this.attr('name');

            icon = $this.find('.ui-sortable-column-icon');
            if (icon.hasClass('ui-icon-carat-2-n-s')) {
                icon.removeClass('ui-icon-carat-2-n-s');
                icon.addClass('ui-icon-triangle-1-n');
                settings.sortAscending = true;
            } else {
                if (icon.hasClass('ui-icon-triangle-1-n')) {
                    settings.sortAscending = false;
                    icon.removeClass('ui-icon-triangle-1-n');
                    icon.addClass('ui-icon-triangle-1-s');
                } else {
                    settings.sortAscending = true;
                    icon.removeClass('ui-icon-triangle-1-s');
                    icon.addClass('ui-icon-triangle-1-n');
                }
            }

            updateTable();
        };

        container.on('click', '.ui-paginator-first:not(.ui-state-disabled)', firstPage);
        container.on('click', '.ui-paginator-prev:not(.ui-state-disabled)', prevPage);
        container.on('click', '.ui-paginator-next:not(.ui-state-disabled)', nextPage);
        container.on('click', '.ui-paginator-last:not(.ui-state-disabled)', lastPage);

        container.on('click', '.ui-sortable-column', sort);
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

    var getRowData = function (id) {
        var cards, i;
        cards = settings.cardsData;

        for (i = 0; i < cards.length; i++) {
            if (cards[i].id === id) {
                return cards[i];
            }
        }
        return null;
    };

    return {
        init: init,
        update: updateTable,
        getRowData: getRowData
    };
}
