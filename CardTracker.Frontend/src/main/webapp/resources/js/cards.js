$(document).ready(function (){
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
        if(rowData.developer){
            if(rowData.implemented)
                return 'inProgressBuggedCard';
            else
                return 'inProgressCard';
        }
        if(rowData.bugged){
            return 'buggedCard';
        }
        if(rowData.implemented){
            return 'implementedCard';
        }
        if(rowData.requested){
            return 'requestedCard';
        }
        return '';
    }

    var costFormat = function (row) {
        var split = row.cost.split('$');
        var html = '';
        for (var i = 0; i < split.length; i++) {
            if (split[i].length)
                html += '<img src="http://gatherer.wizards.com/handlers/image.ashx?size=small&amp;type=symbol&amp;name=' + split[i] + '">';
        }
        return html;
    }

    var actionsFormat = function (row) {
        var html = '';
        var account = localStorage.getItem('account') || sessionStorage.getItem('account');
        if (!account) {
            html = 'Please login';
        } else if (row.implemented && !row.bugged) {
            html = '<a class="buggedAction aButton">Bugged</a>';
            if(!row.tested)
                html += '<a class="testedAction aButton">Tested</a>';
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
    }

    var cardsTable = DataTable(jQuery);
    cardsTable.init({
        url: 'cards',
        container: '#cardsContainer',
        rows: 30,
        columnModel: [
        {
            name: 'Name',
            sortable: false,
            format: function (row) {
                return '<div class="cardName">' + row.name + '</div>';
            }
        },

        {
            name: 'Cost',
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
            name: 'Developer',
            key: 'developer',
            sortable: false
        },

        {
            name: 'Status/Actions',
            sortable: false,
            format: actionsFormat
        }
        ],
        rowClass: rowClass,
        filter: filter
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
                success: function (data){
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