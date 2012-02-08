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
        sets = ['USG', 'INV', 'PLS', 'TMP', 'APC', 'COK'];
        setsReplace = ['UZ', 'IN', 'PS', 'TE', 'AP', 'CHK'];
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
            sortable: true,
            format: function (row) {
                return '<div class="cardName">' + row.name + '</div>';
            }
        },
        {
            name: 'Mana Cost',
            key: 'cost',
            format: costFormat
        },
        {
            name: 'Type',
            key: 'type',
            sortable: true
        },
        {
            name: 'Subtype',
            key: 'subType',
        },
        {
            name: 'P',
            key: 'power',
        },
        {
            name: 'T',
            key: 'toughness',
        },
        {
            name: 'Editions',
            format: editionsFormat
        },
        {
            name: 'Dev',
            key: 'developer',
        },
        {
            name: 'Status/Actions',
            format: actionsFormat
        }
        ]
    });

    filter.setPaginator(cardsTable);

    Tooltip(jQuery).init({
        cardsTable: cardsTable,
        container: '#cardsContainer'
    });

    function onAction(action, id) {
        var account = localStorage.getItem('account') || sessionStorage.getItem('account');
        if (account) {
            account = JSON.parse(account);
            return $.ajax({
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
            var deferred = $.Deferred();
            deferred.reject();
            return deferred;
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

    $('#toogleTooltip').on('click', function () {
        if (localStorage.getItem('scanTooltip')) {
            localStorage.removeItem('scanTooltip');
        } else {
            localStorage.setItem('scanTooltip', 'true');
        }
    });

    $('#cardDialog').dialog({
        autoOpen: false,
        width: 'auto'
    });

    var displayCard = function (cardData) {
        function displayDualCard(cardData, cardContainer) {
            var card1, card2;
            if (cardData.editions[0].cardNumber.indexOf('a') !== -1) {
                if (cardData.editions[0].mtgoImageId && !cardData.otherSide.editions[0].mtgoImageId) {
                    card1 = cardGen(cardData, cardData.otherSide);
                    card2 = cardGen(cardData.otherSide, cardData, true);
                } else {
                    card1 = cardGen(cardData);
                    card2 = cardGen(cardData.otherSide);
                }
            } else {
                if (cardData.otherSide.editions[0].mtgoImageId && !cardData.editions[0].mtgoImageId) {
                    card1 = cardGen(cardData.otherSide, cardData);
                    card2 = cardGen(cardData, cardData.otherSide, true);
                } else {
                    card1 = cardGen(cardData.otherSide);
                    card2 = cardGen(cardData);
                }
            }
            cardContainer.append(card1);
            cardContainer.append(card2);
        }

        function requestOtherSide(cardData) {
            $.ajax({
                url: 'cards',
                dataType: 'json',
                data: {
                    action: 'getCard',
                    cardId: cardData.otherSide
                },
                success: function (data) {
                    cardData.otherSide = data;
                    displayDualCard(cardData);
                }
            });
        }

        var cardDialog = $('#cardDialog');
        cardDialog.html('');

        if (cardData.otherSide === null) {
            cardDialog.append(cardGen(cardData));
        } else {
            if (typeof cardData.otherSide === 'object') {
                displayDualCard(cardData);
            } else {
                $.ajax({
                    url: 'cards',
                    dataType: 'json',
                    data: {
                        action: 'getCard',
                        cardId: cardData.otherSide
                    },
                    success: function (data) {
                        cardData.otherSide = data;
                        displayDualCard(cardData, cardDialog);
                    }
                });
            }
        }
        var buttonsDiv = $('<div name="' + cardData.id + '" class="actionButtons"></div>');
        buttonsDiv.html(actionsFormat(cardData));
        cardDialog.append(buttonsDiv);
        function onPopupAction(action, id) {
            onAction(action, id).done(function () {
                $.ajax({
                    url: 'cards',
                    dataType: 'json',
                    data: {
                        action: 'getCard',
                        cardId: id
                    },
                    success: function (cardData) {
                        buttonsDiv.html(actionsFormat(cardData));
                    }
                });
            });
        }
        buttonsDiv.on('click', '.buggedAction', function (e) {
            onPopupAction('setBugged', cardData.id);
        });
        buttonsDiv.on('click', '.testedAction', function (e) {
            onPopupAction('setTested', cardData.id);
        });
        buttonsDiv.on('click', '.doneAction', function (e) {
            onPopupAction('done', cardData.id);
        });
        buttonsDiv.on('click', '.cancelAction', function (e) {
            onPopupAction('cancel', cardData.id);
        });
        buttonsDiv.on('click', '.unlockAction', function (e) {
            onPopupAction('unlock', cardData.id);
        });
        buttonsDiv.on('click', '.ipAction', function (e) {
            onPopupAction('markIp', cardData.id);
        });

        cardDialog.dialog('open');
    }

    container.on('click', '.cardName', function (e) {
        var cardId = parseInt($(e.target).parents('tr')[0].id, 10);
        var cardData = cardsTable.getRowData(cardId);
        displayCard(cardData);
    });


    $( "#cardNames" ).autocomplete({
        source: "cards?action=findCard",
        minLength: 2,
        autoFocus: true,
        select: function( event, ui ) {
            if (ui.item) {
                $.ajax({
                    url: 'cards',
                    dataType: 'json',
                    data: {
                        action: 'getCard',
                        cardId: ui.item.id
                    },
                    success: displayCard
                });
            }
        }
    });
});