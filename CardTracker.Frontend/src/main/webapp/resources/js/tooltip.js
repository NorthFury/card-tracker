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
        var posY = e.pageY - offset;
        var height = $(window).height();
        if(e.clientY + element.outerHeight() + 5 - offset> height)
            posY -= e.clientY + element.outerHeight() + 5 - offset - height;
        return posY;
    }

    var init = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        element = $('<div style="background: white; display: none; position: absolute; width: 223px; height: 310px; text-align: center;"></div>')
        $('body').append(element);

        var onMouseEnter = function (e) {
            element.html('Loading...');
            element.css({
                left: posX(e),
                top: posY(e)
            });
            element.show();

            $.ajax({
                url: settings.url,
                dataType: 'json',
                data: {
                    action: 'getEdition',
                    cardId: $(e.target).parents('tr')[0].id
                },
                success: function (data){
                    if (image !== null) {
                        image.onload = null;
                    }
                    image = document.createElement('img');
                    image.src= 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' + data.gathererId;

                    if (image.complete) {
                        element.html('');
                        element.append(image)
                    } else {
                        image.onload = function() {
                            image.onload = null;
                            element.html('');
                            element.append(image);
                            image = null;
                        }
                    }
                }
            });
        }

        var onMouseOut = function (e) {
            element.hide();
        }

        var onMouseMove = function (e) {
            element.css({
                left: posX(e),
                top: posY(e)
            });
        }

        $(settings.container).on('mouseover', '.cardName', onMouseEnter);
        $(settings.container).on('mouseout', '.cardName', onMouseOut);
        $(settings.container).on('mousemove', '.cardName', onMouseMove);
    }

    return {
        init: init
    };
}
