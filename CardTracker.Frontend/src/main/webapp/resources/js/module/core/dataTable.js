define(['jquery', 'amplify'], function ($, amplify) {
    "use strict";
    return function(options) {
        var container;
        var requestCount = 0;
        var settings = {
            rows: 30,
            pageToLoad: 0,
            maxPage: 0
        };

        /* ========== Init functions ========== */
        function addPaginator () {
            var paginator;

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

        function addHeader () {
            var i, element, columnModel, htmlString;

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

        function attachEvents () {
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

                updateTable();
            };

            container.on('click', '.ui-paginator-first:not(.ui-state-disabled)', firstPage);
            container.on('click', '.ui-paginator-prev:not(.ui-state-disabled)', prevPage);
            container.on('click', '.ui-paginator-next:not(.ui-state-disabled)', nextPage);
            container.on('click', '.ui-paginator-last:not(.ui-state-disabled)', lastPage);

            container.on('click', '.ui-sortable-column', sort);
        }

        /* ========== Core functions ========== */
        function updatePaginator () {
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

        var updateTable = function (page) {
            if (typeof (page) !== 'undefined') {
                settings.pageToLoad = page;
            }
            var data = {
                page: settings.pageToLoad,
                rows: settings.rows
            };

            if (typeof settings.sortColumn !== "undefined") {
                data.sortColumn = settings.columnModel[settings.sortColumn].key;
                data.sortAscending = settings.sortAscending;
            }

            $.extend(data, settings.filter);

            function onSuccess(requestId) {
                requestCount++;
                return function(data) {
                    var i, j, row, cell, rowsData, tbody, value;

                    if (requestCount !== requestId + 1) {
                        return;
                    }

                    settings.rowsData = data.rowsData;
                    rowsData = data.rowsData;

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

                    if (rowsData.length === 0) {
                        row = $('<tr/>').addClass('ui-widget-content');
                        cell = $('<td><div class="ui-dt-c" style="text-align: center;">No results</div></td>');
                        cell.attr('colspan', settings.columnModel.length);
                        row.append(cell);
                        tbody.append(row);
                    }

                    var table = container.find('table');
                    if (table.find('tbody').length === 0) {
                        table.append(tbody);
                    } else {
                        table.find('tbody').replaceWith(tbody);
                    }

                    settings.totalRows = data.totalRows;
                    settings.maxPage = Math.floor(Math.max(0, data.totalRows - 1) / settings.rows);
                    updatePaginator();
                };
            };

            $.ajax({
                url: settings.url,
                processData: false,
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(data),
                success: onSuccess(requestCount)
            });
        };

        var getRowData = function (id) {
            var rowsData, i;
            rowsData = settings.rowsData;

            for (i = 0; i < rowsData.length; i++) {
                if (rowsData[i].id === id) {
                    return rowsData[i];
                }
            }
            return null;
        };

        /* ========== Initialization ========== */
        if (options) {
            $.extend(settings, options);
        }
        container = $(settings.container);

        container.addClass('ui-datatable ui-widget');

        if (container.find('table').length === 0) {
            addPaginator();
            addHeader();
            attachEvents();
        }
        updateTable();
        amplify.subscribe(settings.filterTopic, function (filter) {
            settings.filter = filter;
            updateTable(0);
        });

        return {
            update: updateTable,
            getRowData: getRowData
        };
    };
});
