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

        element = $('<div style="background: white; display: none; position: absolute; width: 223px; height: 310px; text-align: center;"></div>');
        $('body').append(element);

        var onMouseEnter = function (e) {
            var cardId = parseInt($(e.target).parents('tr')[0].id);
            var cardData = settings.cardsTable.getRowData(cardId);
            element.html('Loading...');
            element.css({
                left: posX(e),
                top: posY(e)
            });
            element.show();

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
