$(document).ready(function () {
    $.ajax({
        url: 'stats',
        dataType: 'json',
        type: 'POST',
        data: {
            action: 'load'
        },
        success: function(data) {
            var rowClass = function (row) {
                return '';
            }
            var cardsTable = SortableTable(jQuery);
            cardsTable.init({
                container: '#statsTable',
                rowClass: rowClass,
                rowsData: data,
                columnModel: [
                {
                    name: 'Name',
                    sortable: true,
                    format: function (row) {
                        return '<a href="cards?expansion=' + row.code + '">' + row.name + '</a>';
                    },
                    comparator: function (a, b) {
                        if (a.name < b.name) {
                            return -1;
                        } else if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    }
                },
                {
                    name: 'Implemented',
                    key: 'implemented',
                    sortable: true,
                    comparator: function (a, b) {
                        return a.implemented - b.implemented;
                    }
                },
                {
                    name: 'Remaining',
                    sortable: true,
                    format: function (row) {
                        return row.total - row.implemented;
                    },
                    comparator: function (a, b) {
                        return (a.total - a.implemented) - (b.total - b.implemented);
                    }
                },
                {
                    name: 'Total',
                    key: 'total',
                    sortable: true,
                    comparator: function (a, b) {
                        return a.implemented - b.implemented;
                    }
                },
                {
                    name: 'Percentage',
                    format: function (row) {
                        var percentage = (row.implemented * 100 / row.total).toFixed(2);
                        var html = '<div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" style="position: relative">' +
                        '<div style="position: absolute; text-align: center; line-height: 1.9em; width: 100%">' + percentage + '%</div>' +
                        '<div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: ' + percentage + '%"></div>' +
                        '</div>'
                        return html;
                    },
                    sortable: true,
                    comparator: function (a, b) {
                        var x, y;
                        x = a.implemented * 100 / a.total;
                        y = b.implemented * 100 / b.total;
                        return x - y;
                    }
                }
                ]
            });
        }
    });
});