function Tooltip($) {
    "use strict";
    var settings = {};
    var element;

    var init = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        element = $('<div style="background: white; display: none; position: absolute; width: 223px; height: 310px; text-align: center;"></div>')
        $('body').append(element);

        var onMouseEnter = function (e) {
            element.html('Loading...');
            element.css({
                left: e.pageX + 5,
                top: e.pageY - 50
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
                    var image = document.createElement('img');
                    image.src= 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' + data.gathererId;

                    if (image.complete) {
                        element.html('');
                        element.append(image)
                    } else {
                        image.onload = function() {
                            image.onload = null;
                            element.html('');
                            element.append(image);
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
                left: e.pageX + 10,
                top: e.pageY - 50
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
