function SortableTable($) {
    "use strict";
    var settings = {};


    var updateTable = function () {
        var i, j, row, cell, rowsData, table, tbody, value;

        rowsData = settings.rowsData;
        table = $(settings.container).find('table');
        tbody = $('<tbody/>').addClass('ui-datatable-data ui-widget-content');

        for (i = 0; i < rowsData.length; i++) {
            row = $('<tr/>').addClass('ui-widget-content').addClass((i % 2 === 0 ? 'ui-datatable-even' : 'ui-datatable-odd'));
            for (j = 0; j < settings.columnModel.length; j++) {
                if (settings.columnModel[j].format) {
                    value = settings.columnModel[j].format(rowsData[i]);
                } else {
                    value = rowsData[i][settings.columnModel[j].key] || '';
                }
                cell = $('<td><div class="ui-dt-c">' + value + '</div></td>');
                row.append(cell);
            }
            row.addClass(settings.rowClass(rowsData[i]));
            row.attr('id', rowsData[i].id);
            tbody.append(row);
        }

        if (table.find('tbody').length === 0) {
            table.append(tbody);
        } else {
            table.find('tbody').replaceWith(tbody);
        }
    };

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
        var onColumnClick = function (e) {
            var $this = $(this);
            var icon, active, i;

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

            var columnModel = settings.columnModel;
            for (i = 0; i < columnModel.length; i++) {
                if (columnModel[i].name === settings.sortColumn) {
                    settings.rowsData.sort(function (a, b) {
                        return (settings.sortAscending ? -1 : 1) * columnModel[i].comparator(a, b);
                    });
                }
            }

            updateTable();
        };

        container.on('click', '.ui-sortable-column', onColumnClick);
    }

    var init = function (options) {

        if (options) {
            $.extend(settings, options);
        }

        $(settings.container).addClass('ui-datatable ui-widget');

        if ($(settings.container).find('table').length === 0) {
            addHeader();
            attachEvents();
        }
        updateTable();
    };

    return {
        init: init
    };
}
