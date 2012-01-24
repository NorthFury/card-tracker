function Tooltip($) {
    "use strict";
    var settings = {};
    var element;
    var image = null;

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

        element = $('<div style="display: none; position: absolute; "></div>');
        $('body').append(element);

        var onMouseEnter = function (e) {
            var cardId = parseInt($(e.target).parents('tr')[0].id, 10);
            var cardData = settings.cardsTable.getRowData(cardId);
            if (localStorage.getItem('largeTooltip')) {
                element.html('');
                element.append(cardGen(cardData));
                if (cardData.otherSide !== null) {
                    if (typeof cardData.otherSide === 'object') {
                        element.append(cardGen(cardData.otherSide));
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
                                element.append(cardGen(cardData.otherSide));
                            }
                        });
                    }
                }
            } else {
                element.html('<div style="background-color: white; width: 200px; text-align: center;">Loading...</div>');

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
