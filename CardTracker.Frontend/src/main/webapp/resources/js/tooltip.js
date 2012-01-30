function Tooltip($) {
    "use strict";
    var settings = {};
    var element;
    var image = null;
    var requestNumber;

    function posX(e) {
        return e.pageX + 10;
    }

    function posY(e) {
        var offset = 50;
        var y = e.pageY - offset;
        var height = $(window).height();
        if (e.clientY + element.outerHeight() + 5 - offset > height) {
            y -= e.clientY + element.outerHeight() + 5 - offset - height;
        }
        return y;
    }

    var init = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        requestNumber = 0;

        element = $('<div style="display: none; position: absolute; "></div>');
        $('body').append(element);

        var onMouseEnter = function (e) {
            var cardId = parseInt($(e.target).parents('tr')[0].id, 10);
            var cardData = settings.cardsTable.getRowData(cardId);

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
                element.append(card1);
                element.append(card2);
            }

            function requestOtherSide(cardData, request) {
                $.ajax({
                    url: 'cards',
                    dataType: 'json',
                    data: {
                        action: 'getCard',
                        cardId: cardData.otherSide
                    },
                    success: function (data) {
                        cardData.otherSide = data;
                        if (requestNumber === request) {
                            displayDualCard(cardData);
                        }
                    }
                });
            }

            if (!localStorage.getItem('scanTooltip')) {
                element.html('');
                if (cardData.otherSide === null) {
                    element.append(cardGen(cardData));
                } else {
                    if (typeof cardData.otherSide === 'object') {
                        displayDualCard(cardData);
                    } else {
                        requestNumber++;
                        requestOtherSide(cardData, requestNumber);
                    }
                }
            } else {
                element.html('<div style="background-color: white; width: 200px; height: 310px; text-align: center;">Loading...</div>');

                if (image !== null) {
                    image.onload = null;
                }
                image = document.createElement('img');
                image.src = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' + cardData.editions[0].gathererId;

                if (image.complete) {
                    element.html('');
                    element.append(image);
                } else {
                    image.onload = function () {
                        image.onload = null;
                        element.html('');
                        element.append(image);
                        image = null;
                    };
                }
            }

            element.css({
                left: posX(e),
                top: posY(e)
            });
            element.show();
        };

        var onMouseOut = function (e) {
            element.hide();
        };

        var onMouseMove = function (e) {
            element.css({
                left: posX(e),
                top: posY(e)
            });
        };

        $(settings.container).on('mouseover', '.cardName', onMouseEnter);
        $(settings.container).on('mouseout', '.cardName', onMouseOut);
        $(settings.container).on('mousemove', '.cardName', onMouseMove);
    };

    return {
        init: init
    };
}
