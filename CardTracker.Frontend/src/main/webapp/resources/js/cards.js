require(['jquery', 'core/dataTable', 'core/cardFilter', 'core/tooltip'], function ($, dataTable, cardFilter, tooltip) {
    $('#dialog').hide();

    cardFilter({
        container: '#cardsFilter',
        topic: 'cardFilter'
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
        var i, html, editions;
        html = '';
        editions = row.editions;
        for (i = 0; i < editions.length; i++) {
            html += '<img style="height: 15px;" src="http://gatherer.wizards.com/handlers/image.ashx?size=small&amp;type=symbol&amp;set=' + editions[i].expansionCode + '&amp;rarity=' + editions[i].rarity[0] + '" title="' + editions[i].expansionName + '">';
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

    var cardsTable = dataTable({
        url: 'cards/load',
        container: '#cardsContainer',
        rows: 30,
        rowClass: rowClass,
        filterTopic: 'cardFilter',
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
            key: 'subType'
        },
        {
            name: 'P',
            key: 'power'
        },
        {
            name: 'T',
            key: 'toughness'
        },
        {
            name: 'Editions',
            format: editionsFormat
        },
        {
            name: 'Dev',
            key: 'developer'
        },
        {
            name: 'Status/Actions',
            format: actionsFormat
        }
        ]
    });

    tooltip({
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
                    cardId: id
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
        $( "#cardUnlockConfirmDialog" ).dialog({
            resizable: false,
            height:140,
            modal: true,
            buttons: {
                Unlock: function () {
                    onAction('unlock', $(e.target).parents('tr')[0].id);
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
    container.on('click', '.ipAction', function (e) {
        onAction('markIp', $(e.target).parents('tr')[0].id);
    });

    $('#toogleTooltip').button({label: 'Toggle tooltip: ' + (localStorage.getItem('scanTooltip') ? 'Scan' : 'Generated')});
    $('#toogleTooltip').on('click', function () {
        if (localStorage.getItem('scanTooltip')) {
            localStorage.removeItem('scanTooltip');
            $('#toogleTooltip').button({label: 'Toggle tooltip: Generated'});
        } else {
            localStorage.setItem('scanTooltip', 'true');
            $('#toogleTooltip').button({label: 'Toggle tooltip: Scan'});
        }
    });

    $('#cardDialog').dialog({
        autoOpen: false,
        width: 'auto'
    });

    var displayCard = function (cardData) {
        var cardDialog = $('#cardDialog');
        cardDialog.html('<table><tr><td id="cardDialogDisplay"></td></tr><tr><td id="cardDialogData"></td></tr></table>');

        function displayDualCard(cardData) {
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
            $('#cardDialogDisplay').append(card1);
            $('#cardDialogDisplay').append(card2);
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

        if (cardData.otherSide === null) {
            $('#cardDialogDisplay').append(cardGen(cardData));
        } else {
            displayDualCard(cardData);
        }
        var buttonsDiv = $('<div name="' + cardData.id + '" class="actionButtons"></div>');
        buttonsDiv.html(actionsFormat(cardData));
        $('#cardDialogData').append(buttonsDiv);
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

        $('#cardDialogData').append('<br/><a target="_blank" href="http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + cardData.editions[0].gathererId + '">Gatherer Link</a>');

        function loadComments() {
            commentsTable.html('');
            $.ajax({
                url: 'cards',
                dataType: 'json',
                data: {
                    action: 'getComments',
                    cardId: cardData.id
                },
                success: function (comments) {
                    function createComment(comment) {
                        var html = '<tr>';
                        html += '<td>' + comment.accountName + '</td>';
                        html += '<td>' + comment.text.replace('\n', '</br>') + '</td>';
                        html += '</tr>';
                        return html;
                    }

                    for (var i = 0; i < comments.length; i++) {
                        commentsTable.append(createComment(comments[i]));
                    }
                }
            });
        }
        var commentsContainer = $('<div></div>');
        var commentTextArea = $('<textarea rows="5" cols="60"></textarea>');
        var commentButton = $('<a>Post</a>');
        var commentsTable = $('<table border="1px" cellspacing="0" cellpadding="4px" style="width: 100%"></table>');
        commentsContainer.append(commentsTable);
        commentsContainer.append(commentButton);
        commentsContainer.append('</br>');
        commentsContainer.append(commentTextArea);

        commentButton.button();
        commentButton.on('click', function () {
            var text = commentTextArea.val();
            if (text.length > 0) {
                $.ajax({
                    url: 'cards',
                    dataType: 'json',
                    data: {
                        action: 'comment',
                        cardId: cardData.id,
                        text: text
                    },
                    success: function () {
                        commentTextArea.val('');
                        loadComments();
                    }
                });
            }
        });
        $('#cardDialogData').append(commentsContainer);
        cardDialog.dialog('open');
        loadComments();
    };

    container.on('click', '.cardName', function (e) {
        var cardId = parseInt($(e.target).parents('tr')[0].id, 10);
        var cardData = cardsTable.getRowData(cardId);
        displayCard(cardData);
    });


    $('#cardNames').autocomplete({
        source: "cards?action=findCard",
        minLength: 2,
        autoFocus: true,
        select: function(event, ui) {
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
