define(['jquery'], function($) {
    "use strict";
    return function(options) {
        var settings = {};

        var updateTable = function() {
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
                if (settings.rowClass0) {
                    row.addClass(settings.rowClass(rowsData[i]));
                }
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
                    if (columnModel.comparator) {
                        htmlString += '<span class="ui-sortable-column-icon ui-icon ui-icon-carat-2-n-s"></span>';
                    }
                    htmlString += '<span>' + columnModel.name + '</span>';
                    htmlString += '</div>';
                    element.append($('<th/>').html(htmlString).addClass('ui-state-default' + (columnModel.comparator ? ' ui-sortable-column' : '')));
                }
            }
        }

        function attachEvents() {
            var container = $(settings.container);
            var onColumnClick = function(e) {
                var $this = $(this);

                if (this.cellIndex !== settings.sortColumn) {
                    settings.sortAscending = true;
                } else {
                    settings.sortAscending = !settings.sortAscending;
                }
                settings.sortColumn = this.cellIndex;

                container.find('.ui-sortable-column').removeClass('ui-state-active');
                container.find('.ui-sortable-column .ui-sortable-column-icon').removeClass('ui-icon-triangle-1-n ui-icon-triangle-1-s').addClass('ui-icon-carat-2-n-s');

                $this.find('.ui-sortable-column-icon').removeClass('ui-icon-carat-2-n-s').addClass(settings.sortAscending ? 'ui-icon-triangle-1-s' : 'ui-icon-triangle-1-n');
                $this.addClass('ui-state-active');

                settings.rowsData.sort(function(a, b) {
                    return (settings.sortAscending ? 1 : -1) * settings.columnModel[settings.sortColumn].comparator(a, b);
                });

                updateTable();
            };

            container.on('click', '.ui-sortable-column', onColumnClick);
        }

        if (options) {
            $.extend(settings, options);
        }

        $(settings.container).addClass('ui-datatable ui-widget');

        if ($(settings.container).find('table').length === 0) {
            addHeader();
            attachEvents();
        }
        updateTable();

        return {
        };
    };
});