require(['core/sortableTable'], function (sortableTable) {
    var columnModel = [
        {
            name: 'Name',
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
            comparator: function (a, b) {
                return a.implemented - b.implemented;
            }
        },
        {
            name: 'Remaining',
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
            comparator: function (a, b) {
                return a.total - b.total;
            }
        },
        {
            name: 'Percentage',
            format: function (row) {
                var percentage = (row.implemented * 100 / row.total).toFixed(2);
                var html = '<div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" style="position: relative">' +
                        '<div style="position: absolute; text-align: center; line-height: 1.9em; width: 100%">' + percentage + '%</div>' +
                        '<div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: ' + percentage + '%"></div>' +
                        '</div>';
                return html;
            },
            comparator: function (a, b) {
                var x, y;
                x = a.implemented * 100 / a.total;
                y = b.implemented * 100 / b.total;
                return x - y;
            }
        }
    ];

    $.ajax({
        url: 'stats',
        dataType: 'json',
        type: 'POST',
        data: {
            action: 'load'
        },
        success: function (data) {
            sortableTable({
                container: '#statsTable',
                rowsData: data,
                columnModel: columnModel
            });
        }
    });
});
