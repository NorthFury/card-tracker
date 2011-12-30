$(document).ready(function () {
    $('#dialog').hide();

    var login = Login(jQuery);
    login.init({
        container: '#loginContainer'
    });

    var filter = CardsFilter(jQuery);
    filter.init({
        container: '#cardsFilter'
    });

    var rowClass = function (rowData) {
        if (rowData.developer) {
            if (rowData.implemented) {
                return 'inProgressBuggedCard';
            } else {
                return 'inProgressCard';
            }
        }
        if (rowData.bugged) {
            return 'buggedCard';
        }
        if (rowData.implemented) {
            return 'implementedCard';
        }
        if (rowData.requested) {
            return 'requestedCard';
        }
        return '';
    };

    var costFormat = function (row) {
        var i, split, html;
        split = row.cost.split('$');
        html = '';
        for (i = 0; i < split.length; i++) {
            if (split[i].length) {
                html += '<img src="http://gatherer.wizards.com/handlers/image.ashx?size=small&amp;type=symbol&amp;name=' + split[i] + '">';
            }
        }
        return html;
    };

    var editionsFormat = function (row) {
        var i, j, html, editions, expansion, sets, setsReplace;
        sets = ['INV', 'PLS', 'TMP', 'APC', 'COK'];
        setsReplace = ['IN', 'PS', 'TE', 'AP', 'CHK'];
        html = '';
        editions = row.editions;
        for (i = 0; i < editions.length; i++) {
            expansion = editions[i].expansionCode;
            for (j = 0; j < sets.length; j++) {
                expansion = expansion.replace(sets[j], setsReplace[j]);
            }
            html += '<img style="height: 15px;" src="http://gatherer.wizards.com/handlers/image.ashx?size=small&amp;type=symbol&amp;set=' + expansion + '&amp;rarity=' + editions[i].rarity[0] + '" title="' + editions[i].expansionName + '">';
        }
        return html;
    };

    var actionsFormat = function (row) {
        var html = '';
        var account = localStorage.getItem('account') || sessionStorage.getItem('account');
        if (!account) {
            html = 'Please login';
        } else if (row.implemented && !row.bugged) {
            html = '<a class="buggedAction aButton">Bugged</a>';
            if (!row.tested) {
                html += '<a class="testedAction aButton">Tested</a>';
            }
        } else if (row.developer) {
            account = JSON.parse(account);
            if (row.developer === account.name) {
                html = '<a class="doneAction aButton">Done</a><a class="cancelAction aButton">Cancel</a>';
            } else {
                html = '<a class="unlockAction aButton">Unlock</a>';
            }
        } else {
            html = '<a class="ipAction aButton">Mark IP</a>';
        }
        return html;
    };

    var cardsTable = DataTable(jQuery);
    cardsTable.init({
        url: 'cards',
        container: '#cardsContainer',
        rows: 30,
        rowClass: rowClass,
        filter: filter,
        columnModel: [
            {
                name: 'Name',
                sortable: false,
                format: function (row) {
                    return '<div class="cardName">' + row.name + '</div>';
                }
            },
            {
                name: 'Mana Cost',
                key: 'cost',
                sortable: false,
                format: costFormat
            },
            {
                name: 'Type',
                key: 'type',
                sortable: false
            },
            {
                name: 'Subtype',
                key: 'subType',
                sortable: false
            },
            {
                name: 'P',
                key: 'power',
                sortable: false
            },
            {
                name: 'T',
                key: 'toughness',
                sortable: false
            },
            {
                name: 'Editions',
                sortable: false,
                format: editionsFormat
            },
            {
                name: 'Dev',
                key: 'developer',
                sortable: false
            },
            {
                name: 'Status/Actions',
                sortable: false,
                format: actionsFormat
            }
        ]
    });

    filter.setPaginator(cardsTable);

    Tooltip(jQuery).init({
        url: 'cards',
        container: '#cardsContainer'
    });

    function onAction(action, id) {
        var account = localStorage.getItem('account') || sessionStorage.getItem('account');
        if (account) {
            account = JSON.parse(account);
            $.ajax({
                url: 'cards',
                dataType: 'json',
                data: {
                    action: action,
                    cardId: id,
                    name: account.name,
                    password: account.password
                },
                success: function (data) {
                    cardsTable.update();
                }
            });
        } else {
            alert('Please login!');
        }
    }
    var container = $('#cardsContainer');
    container.on('click', '.buggedAction', function (e) {
        onAction('setBugged', $(e.target).parents('tr')[0].id);
    });
    container.on('click', '.testedAction', function (e) {
        onAction('setTested', $(e.target).parents('tr')[0].id);
    });
    container.on('click', '.doneAction', function (e) {
        onAction('done', $(e.target).parents('tr')[0].id);
    });
    container.on('click', '.cancelAction', function (e) {
        onAction('cancel', $(e.target).parents('tr')[0].id);
    });
    container.on('click', '.unlockAction', function (e) {
        onAction('unlock', $(e.target).parents('tr')[0].id);
    });
    container.on('click', '.ipAction', function (e) {
        onAction('markIp', $(e.target).parents('tr')[0].id);
    });
});